<script setup lang="ts">
import {toRef} from "vue";
import {BusinessAiControllerClient} from "~/utils/apiQueries.ts";
import {ApiHttpClient, PublicationInfoData} from "~/utils/clientProvider.ts";

const props = defineProps<{publication: PublicationInfoData, index: number}>();
const publication = toRef(props, 'publication');
const emits = defineEmits(['reject']);

const modified = ref(false);

const considered = () => {
  return publication.value.readyState === "READY";
}

const approvePublication = async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.approvePublication(publication.value.id);
  publication.value.readyState = "READY";
}

const rejectPublication = () => {
  emits('reject', publication, props.index);
}
</script>

<template>
  <div class="flex flex-row gap-2">
    <Card class="basis-1/3">
      <template #title>
        <Carousel v-if="publication.images.length > 0" :value="publication.images">
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
      </template>
      <template #content>
        <Editor class="w-full" id="description" v-model="publication.description" readonly/>
      </template>
    </Card>
    <div class="basis-2/3">
      <InputGroup v-if="!considered()" class="flex flex-row-reverse gap-6">
        <Button @click="approvePublication">Опубликовать</Button>
        <Button @click="rejectPublication">Отклонить</Button>
      </InputGroup>
      <FloatLabel variant="on" class="w-full">
        <label for="request">Сообщение для публикации</label>
        <Textarea id="request" v-symbolModel="publication.note" class="w-full" style="min-height: 300px"
                  @update:symbolModel-value="modified = true" :disabled="considered()"/>
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-editor-toolbar) {
  display: none;
}
</style>