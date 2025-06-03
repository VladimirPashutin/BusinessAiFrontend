<script setup lang="ts">
import {toRef,onMounted} from "vue";
import type {Assortment} from "~/utils/apiQueries.ts";
import type {EditorTextChangeEvent} from "primevue/editor";
import type {FileUploadSelectEvent} from "primevue/fileupload";
import {CommonDataControllerClient} from "~/utils/apiQueries.ts";
import {ApiHttpClient, FileUploadClient} from "~/utils/clientProvider.ts";

const emits = defineEmits(['update','delete']);

const images = ref([]);
const selectedImage = ref(null as number | null);

const props = defineProps<{assortment: Assortment | null}>();
const assortmentInfo = toRef(props, 'assortment');

const modified = ref(false);

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

onMounted(async () => {
  let forRemove = [];
  if(assortment.images.length == 0) { return; }
  const delClient = new CommonDataControllerClient(new ApiHttpClient());
  const getClient = new CommonDataControllerClient(new ApiHttpClient("image/"));
  for(const i in assortment.images) {
    const response = await getClient.getImage("assortment|" + assortment.id + "|" + assortment.images[i]);
    if(response.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = function () {
        images.value[i] = reader.result;
      }
    } else { forRemove.push(i);
      await delClient.deleteAssortmentImage(assortment.id, assortment.images[i]);
    }
  }
  for(const i in forRemove) {
    assortment.images.splice(forRemove[i], 1);
  }
})

const descriptionChanged =(event: EditorTextChangeEvent) => {
  assortment.description = event.htmlValue;
  modified.value = true;
}

const saveModifications = () => {
  emits('update', assortment);
  modified.value = false;
}

const selectImage = (value) => {
  selectedImage.value = value;
}

const onLoadNewImage = async (event: FileUploadSelectEvent) => {
  let imageIndex;
  const extension = event.files[0].name.split('.').pop();
  const imageName = event.files[0].name.replace("." + extension, "");
  const client = new CommonDataControllerClient(new FileUploadClient());
  if(assortment.images.includes(imageName)) {
    imageIndex = assortment.images.indexOf(imageName);
  } else { assortment.images.push(imageName);
    imageIndex = images.value.length;
  }
  const reader = new FileReader();
  reader.onloadend = async () => {
    images.value[imageIndex] = reader.result;
  }
  reader.readAsDataURL(event.files[0]);
  await client.saveAssortmentImage(assortment.id, imageName, { file: event.files[0]});
}

const deleteSelectedImage = async () => {
  if(selectedImage.value === null) { return; }
  const client = new CommonDataControllerClient(new ApiHttpClient());
  await client.deleteAssortmentImage(assortment.id, assortment.images[selectedImage.value]);
  assortment.images.splice(selectedImage.value, 1);
  images.value.splice(selectedImage.value, 1);
}
</script>

<template>
  <div>
    <InputGroup class="gap-2">
      <InputGroupAddon class="gap-2">
        <label for="name">Наименование</label>
        <InputText id="name" v-model.trim="assortment.name" autofocus
                  :invalid="!assortment.name" fluid @change="modified = true" />
      </InputGroupAddon>
      <InputGroupAddon class="gap-2">
        <label for="article">Артикул</label>
        <InputText id="article" v-model.trim="assortment.article" fluid @change="modified = true" />
      </InputGroupAddon>
      <Button @click="$emit('delete', assortment)">Удалить</Button>
      <Button v-if="modified" @click="saveModifications">Сохранить изменения</Button>
    </InputGroup>
    <InputGroup class="flex flex-row gap-2">
      <div class="basis-1/3">
        <Carousel :value="images" @update:page="selectImage">
          <template #item="slotProps">
            <div>
              <div>
                <Image alt="Фото продукта" height="160" preview>
                  <template #previewicon>
                    <i class="pi pi-search"/>
                  </template>
                  <template #image>
                    <img :src="slotProps.data" alt="Фото продукта"/>
                  </template>
                  <template #preview="imageProps">
                    <img :src="slotProps.data" alt="Фото продукта" :style="imageProps.style" @click="imageProps.onClick"/>
                  </template>
                </Image>
              </div>
            </div>
          </template>
        </Carousel>
        <InputGroup class="gap-6">
          <FileUpload id="loadNewImage" mode="basic" @select="onLoadNewImage" customUpload auto/>
          <Button @click="deleteSelectedImage" class="pi pi-minus"> Удалить</Button>
        </InputGroup>
      </div>
      <Editor class="basis-2/3" id="description" v-model="assortment.description" @text-change="descriptionChanged" />
    </InputGroup>
  </div>
</template>
