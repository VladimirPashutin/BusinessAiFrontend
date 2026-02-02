<script setup lang="ts">
import {ref, toRef} from "vue";
import type {Assortment} from "~/utils/apiQueries.ts";
import {BusinessCommonControllerClient} from "~/utils/apiQueries.ts";
import type {EditorTextChangeEvent} from "primevue/editor";
import type {FileUploadSelectEvent} from "primevue/fileupload";
import {ApiHttpClient, FileUploadClient} from "~/utils/clientProvider.ts";

export type AssortmentData = [Assortment, Array<string | ArrayBuffer>];

const props = defineProps<{orgId: string, assortment: AssortmentData}>();
const emits = defineEmits(['delete']);

const assortmentData = toRef(props, 'assortment');
const orgId = toRef(props, 'orgId');

const selectedImage = ref(null as number | null);

let unsavedImages = new Map<string, any>();

let imagesForDelete = [] as Array<string>;

const modified = ref(false);

const images = computed({
  get: () => assortmentData.value[1],
  set: (newImages) => { assortmentData.value[1] = newImages; }
});

const descriptionChanged =(event: EditorTextChangeEvent) => {
  assortmentData.value[0].description = event.htmlValue;
  modified.value = true;
}

const saveModifications = async () => {
  const runtimeConfig = useRuntimeConfig();
  const saveClient = new BusinessCommonControllerClient(new FileUploadClient(runtimeConfig.app.businessHost));
  const client = new BusinessCommonControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.saveAssortment(orgId.value, assortmentData.value[0]);
  for(let name of imagesForDelete)
  { await client.deleteAssortmentImage(assortmentData.value[0].id, name); }
  for(let entry of unsavedImages) {
    await saveClient.saveAssortmentImage(assortmentData.value[0].id, entry[0],
         { orgId: orgId.value, file: entry[1]});
  }
  modified.value = false;
  unsavedImages.clear();
  imagesForDelete = [];
}

const selectImage = (value: number) => {
  selectedImage.value = value;
}

const onLoadNewImage = (event: FileUploadSelectEvent) => {
  let imageIndex;
  const extension = event.files[0].name.split('.').pop();
  const imageName = event.files[0].name.replace("." + extension, "");
  if(assortmentData.value[0].images.includes(imageName)) {
    imageIndex = assortmentData.value[0].images.indexOf(imageName);
  } else { imageIndex = assortmentData.value[0].images.push(imageName) - 1; }
  const reader = new FileReader();
  reader.onloadend = () => {
    if(reader.result !== null) {
      assortmentData.value[1][imageIndex] = reader.result;
      unsavedImages.set(imageName, event.files[0]);
      images.value = assortmentData.value[1];
    }
  }
  reader.readAsDataURL(event.files[0]);
  if(selectedImage.value === null)
  { selectedImage.value = 0; }
  modified.value = true;
}

const deleteSelectedImage = () => {
  if(selectedImage.value === null) { return; }
  imagesForDelete.push(assortmentData.value[0].images[selectedImage.value]);
  assortmentData.value[0].images.splice(selectedImage.value, 1);
  assortmentData.value[1].splice(selectedImage.value, 1);
  images.value = assortmentData.value[1];
  modified.value = true;
}
</script>

<template>
  <div>
    <InputGroup class="gap-2">
      <InputGroupAddon class="gap-2">
        <label for="name">Наименование</label>
        <InputText id="name" v-symbolModel.trim="assortmentData[0].name" autofocus placeholder="Введите наименование"
                  :invalid="!assortmentData[0].name" fluid @change="modified = true" />
      </InputGroupAddon>
      <InputGroupAddon class="gap-2">
        <label for="article">Артикул</label>
        <InputText id="article" v-symbolModel.trim="assortmentData[0].article" fluid @change="modified = true"
                   placeholder="Введите артикул"/>
      </InputGroupAddon>
      <Button severity="warn" @click="$emit('delete', assortmentData[0])">Удалить</Button>
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
                    <img :src="slotProps.data" alt="Фото продукта" :style="imageProps.style"/>
                  </template>
                </Image>
              </div>
            </div>
          </template>
        </Carousel>
        <InputGroup class="gap-6">
          <FileUpload id="loadNewImage" mode="basic" @select="onLoadNewImage"
                      customUpload auto accept="image/*" :maxFileSize="10000000"/>
          <Button severity="warn" @click="deleteSelectedImage" class="pi pi-minus"> Удалить</Button>
        </InputGroup>
      </div>
      <Editor class="basis-2/3" id="description" v-symbolModel="assortmentData[0].description"
              placeholder="Введите описание" @text-change="descriptionChanged" />
    </InputGroup>
  </div>
</template>
