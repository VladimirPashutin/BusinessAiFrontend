<script setup lang="ts">
import {v4 as uuidv4} from 'uuid';
import {toRef,onMounted} from "vue";
import type {Assortment} from "~/utils/apiQueries.ts";
import type {EditorTextChangeEvent} from "primevue/editor";
import type {FileUploadSelectEvent} from "primevue/fileupload";
import {CommonDataControllerClient} from "~/utils/apiQueries.ts";
import {ApiHttpClient, FileUploadClient} from "~/utils/clientProvider.ts";

const emits = defineEmits(['update','delete']);

const props = defineProps<{assortment: Assortment | null}>();
const assortmentInfo = toRef(props, 'assortment');

let assortment: Assortment = assortmentInfo.value === null ? {
  description: "Описание ассортиментной позиции",
  measurement: "Единица измерения",
  name: "Наименование",
  article: "Артикул",
  goodsProperty: [],
  trademark: "",
  barcode: "",
  ok_code: "",
  images: [],
  id: ""
} : assortmentInfo.value;

const descriptionChanged =(event: EditorTextChangeEvent) => {
  assortment.description = event.htmlValue;
  emits('update', assortment);
}

let images = ref([]);

onMounted(async () => {
  if(assortment.images.length == 0) { return; }
  const client = new CommonDataControllerClient(new ApiHttpClient("application/octet-stream"));
  for(const i in assortment.images) {
    const response = await client.getAssortmentImage(assortment.id, assortment.images[i]);
    const reader = new FileReader();
    reader.readAsDataURL(response);
    reader.onloadend = function () {
      images.value[i] = reader.result;
    }
  }
})

const onSelectNewImage = async (event: FileUploadSelectEvent) => {
  const client = new CommonDataControllerClient(new FileUploadClient());
  const imageName = uuidv4();
  await client.saveAssortmentImage(assortment.id, imageName, { file: event.files[0]});
  assortment.images.push(imageName);
}
</script>

<template>
  <div class="flex flex-column gap-2">
    <InputGroup class="w-full gap-4">
      <InputGroupAddon class="gap-2 w-75">
        <label for="name" class="block font-bold">Наименование</label>
        <InputText id="name" v-model.trim="assortment.name" autofocus :invalid="!assortment.name" fluid
                   @change="$emit('update', assortment)" />
      </InputGroupAddon>
      <InputGroupAddon class="gap-2 w-25">
        <label for="article" class="block font-bold">Артикул</label>
        <InputText id="article" v-model.trim="assortment.article" fluid
                   @change="$emit('update', assortment)" />
      </InputGroupAddon>
      <Button @click="$emit('delete', assortment)">Удалить</Button>
    </InputGroup>
    <div>
      <Editor id="description" v-model="assortment.description"
              @text-change="descriptionChanged" />
    </div>
    <Carousel :value="images">
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
          <div class="relative mx-auto">
            <Image :src="slotProps.data" alt="Фото продукта" height="160"/>
          </div>
        </div>
      </template>
    </Carousel>
    <InputGroup class="w-full gap-4">
      <InputGroupAddon class="gap-2">
        <label for="loadNewImage" class="block font-bold">Загрузить новое изображение</label>
        <FileUpload id="loadNewImage" mode="basic" @select="onSelectNewImage" customUpload auto/>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
