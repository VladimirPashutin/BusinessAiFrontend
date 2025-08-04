<script setup lang="ts">
import {v4 as uuidv4} from 'uuid';
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {type Assortment, CommonDataControllerClient} from "~/utils/apiQueries.ts";
import AssortmentInfo, {type AssortmentData} from "~/components/AssortmentInfo.vue";

const route = useRoute();
const organizationId = ref(null as any as string);
const assortments = ref([] as Array<AssortmentData>);

onMounted(async () => {
  const runtimeConfig = useRuntimeConfig();
  const commonClient = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  const getClient = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost, "image/"));
  const organization = await commonClient.getOrganizationByName(<string>route.params.orgName);
  const assortmentsList = await commonClient.getAssortmentList(organization.id);
  organizationId.value = organization.id;
  for(let i = 0; i < assortmentsList.length; i++) {
    let images: Array<string | ArrayBuffer> = [];
    for(let j = 0; j < assortmentsList[i].images.length; j++) {
      const response = <Blob>await getClient.getImage("assortment|" +
            assortmentsList[i].id + "|" + assortmentsList[i].images[j]);
      if(response.size > 0) { images.push(URL.createObjectURL(response)); }
      else { await commonClient.deleteAssortmentImage(assortmentsList[i].id, assortmentsList[i].images[j]); }
    }
    assortments.value.push([assortmentsList[i], images]);
  }
});

const deleteAssortment = async (assortment: Assortment) => {
  const runtimeConfig = useRuntimeConfig();
  const commonClient = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  for(let image of assortment.images)
  { await commonClient.deleteAssortmentImage(assortment.id, image); }
  await commonClient.deleteAssortment(assortment.id);
  let index: number = -1;
  for(let i = 0; i < assortments.value.length; i++) {
    if(assortments.value[i][0].id === assortment.id) {
      index = i;
      break;
    }
  }
  if(index >= 0) { assortments.value.splice(index, 1); }
}

const addAssortment = () => {
  assortments.value.push([<Assortment>{
    goodsProperty: [],
    description: "",
    measurement: "",
    trademark: "",
    id: uuidv4(),
    barcode: "",
    ok_code: "",
    article: "",
    images: [],
    name: ""
  }, []]);
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Откорректируйте список ваших товаров или услуг</h3>
      </template>
      <template #end>
        <Button @click="addAssortment">Добавить</Button>
      </template>
    </Toolbar>
    <Fieldset v-for="assortment in assortments" :legend="assortment[0].name" toggleable collapsed>
      <AssortmentInfo :assortment="assortment" :org-id="organizationId" @delete="deleteAssortment"/>
    </Fieldset>
  </div>
</template>
