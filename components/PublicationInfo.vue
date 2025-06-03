<script setup lang="ts">
import {toRef,onMounted} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {CommonDataControllerClient, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const emits = defineEmits(['reject']);

const props = defineProps<{publication: PublicationsResponse, index: number}>();
const publication = toRef(props, 'publication');

const modified = ref(false);
const description = ref();
const image = ref();

onMounted(async () => {
  const client = new CommonDataControllerClient(new ApiHttpClient('application/octet-stream'));
  image.value = URL.createObjectURL(await client.getImage("assortment|" + publication.value.assortmentId +
                                                              "|" + publication.value.images[0]));
  description.value = (await client.getAssortment(publication.value.assortmentId)).description;
});

const considered = () => {
  return publication.value.readyState === "READY";
}

const approvePublication = async () => {
  const client = new BusinessAiControllerClient(new ApiHttpClient());
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
      <template #content>
        <div v-html="description"/>
      </template>
    </Card>
    <div class="basis-2/3">
      <InputGroup v-if="!considered()" class="flex flex-row-reverse gap-6">
        <Button @click="approvePublication">Опубликовать</Button>
        <Button @click="rejectPublication">Отклонить</Button>
      </InputGroup>
      <FloatLabel variant="on">
        <label for="request">Сообщение для публикации</label>
        <Textarea id="request" v-model="publication.note" class="w-full h-dvh"
                  @update:model-value="modified = true" :disabled="considered()"/>
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped>

</style>