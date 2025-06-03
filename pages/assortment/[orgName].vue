<script setup lang="ts">
import {v4 as uuidv4} from 'uuid';
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import AssortmentInfo from "~/components/AssortmentInfo.vue";
import {type Assortment, CommonDataControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const organizationId = ref(null as any as string);
const assortments = ref([] as Assortment[]);

onMounted(async () => {
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  const organization = await commonClient.getOrganization(<string>route.params.orgName);
  assortments.value = await commonClient.getAssortmentList(organization.id);
  organizationId.value = organization.id;
});

const updateAssortmentInfo = (assortment: Assortment) => {
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  commonClient.saveAssortment(organizationId.value, assortment);
}

const deleteAssortment = async (assortment: Assortment) => {
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  await commonClient.deleteAssortment(assortment.id);
  let index: number = -1;
  for(const i in assortments.value) {
    if(assortments.value[i].id === assortment.id) {
      index = i;
      break;
    }
  }
  if(index >= 0) {
    assortments.value.splice(index, 1);
  }
}

const addAssortment = () => {
  //@ts-ignore
  assortments.value.push(new Assortment({
    description: "Описание ассортиментной позиции",
    measurement: "Единица измерения",
    name: "Наименование",
    article: "Артикул",
    goodsProperty: [],
    trademark: "",
    id: uuidv4(),
    barcode: "",
    ok_code: "",
    images: []
  }));
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
    <Fieldset v-for="assortment in assortments" :legend="assortment.name" toggleable collapsed>
      <AssortmentInfo :assortment="assortment" @update="updateAssortmentInfo" @delete="deleteAssortment"/>
    </Fieldset>
  </div>
</template>
