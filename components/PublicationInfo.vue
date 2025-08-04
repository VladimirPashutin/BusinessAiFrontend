<script setup lang="ts">
import {toRef,onMounted} from "vue";
import {ApiHttpClient, truncate} from "~/utils/clientProvider.ts";
import {CommonDataControllerClient, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const emits = defineEmits(['reject']);

const props = defineProps<{publication: PublicationsResponse, index: number}>();
const publication = toRef(props, 'publication');

const modified = ref(false);
const description = ref();
const image = ref();

onMounted(async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost,'application/octet-stream'));
  description.value = truncate((await client.getAssortment(publication.value.assortmentId)).description, 200);
  const imageBody = await client.getImage(publication.value.images[0]);
  if(imageBody) { image.value = URL.createObjectURL(imageBody); }
});

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
        <img alt="Изображение" :src="image"/>
      </template>
<!--      <template #content>-->
<!--        <div class="w-10">-->
<!--          <div v-html="description"/>-->
<!--        </div>-->
<!--      </template>-->
    </Card>
    <div class="basis-2/3">
      <InputGroup v-if="!considered()" class="flex flex-row-reverse gap-6">
        <Button @click="approvePublication">Опубликовать</Button>
        <Button @click="rejectPublication">Отклонить</Button>
      </InputGroup>
      <FloatLabel variant="on" class="w-full">
        <label for="request">Сообщение для публикации</label>
        <Textarea id="request" v-model="publication.note" class="w-full" style="min-height: 300px"
                  @update:model-value="modified = true" :disabled="considered()"/>
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped>

</style>