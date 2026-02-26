<script setup lang="ts">
import {v4 as uuidv4} from 'uuid';
import {onMounted, ref} from "vue";
import {type Assortment} from "~/utils/apiQueries.ts";
import type {FileUploadSelectEvent} from "primevue/fileupload";
import {getCommonClient, getCommonDataClient} from "~/utils/clientProvider.ts";
import AssortmentInfo, {type AssortmentData} from "~/components/AssortmentInfo.vue";

const route = useRoute();
const organizationId = ref(null as any as string);
const assortments = ref([] as Array<AssortmentData>);

onMounted(async () => {
  const organization = await getCommonClient().getOrganizationByName(<string>route.params.orgName);
  const assortmentsList = await getCommonClient().getAssortmentList(organization.id);
  organizationId.value = organization.id;
  for(let i = 0; i < assortmentsList.length; i++) {
    let images: Array<string | ArrayBuffer> = [];
    for(let j = 0; j < assortmentsList[i].images.length; j++) {
      if(assortmentsList[i].images[j].startsWith("http") &&
         assortmentsList[i].images[j].includes("://"))
      { images.push(assortmentsList[i].images[j]); }
      else { const response = <Blob>await getCommonDataClient().getImage("assortment|" +
                   assortmentsList[i].id + "|" + assortmentsList[i].images[j]);
        if(response.size > 0) { images.push(URL.createObjectURL(response)); }
        else { await getCommonClient("image/").deleteAssortmentImage(
               assortmentsList[i].id, assortmentsList[i].images[j]);
        }
      }
    }
    assortments.value.push([assortmentsList[i], images]);
  }
});

const deleteAssortment = async (assortment: Assortment) => {
  for(let image of assortment.images)
  { await getCommonClient().deleteAssortmentImage(assortment.id, image); }
  await getCommonClient().deleteAssortment(assortment.id);
  let index: number = -1;
  for(let i = 0; i < assortments.value.length; i++) {
    if(assortments.value[i][0].id === assortment.id) {
      index = i;
      break;
    }
  }
  if(index >= 0) { assortments.value.splice(index, 1); }
}

const loadAssortment = async (event: FileUploadSelectEvent) => {
  await getCommonClient().saveAssortmentsFromExcel(organizationId.value, { file: event.files[0] });
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
        <FileUpload id="loadAssortments" mode="basic" @select="loadAssortment" customUpload auto severity="secondary"
                    accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :maxFileSize="10000000" choose-label="Excel файл с перечнем ассортимента"/>
        <Divider layout="vertical" />
        <Button @click="addAssortment">Добавить</Button>
      </template>
    </Toolbar>
    <Fieldset v-for="assortment in assortments" :legend="assortment[0].name" toggleable collapsed>
      <AssortmentInfo :assortment="assortment" :org-id="organizationId" @delete="deleteAssortment"/>
    </Fieldset>
  </div>
</template>
