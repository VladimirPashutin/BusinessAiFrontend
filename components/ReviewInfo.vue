<script setup lang="ts">
import {toRef} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {type GeneratedResponse, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const props = defineProps<{response: GeneratedResponse, index: number}>();
const response = toRef(props, 'response');
const modified = ref(false);

const approveResponse = async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.approveResponse({ id: response.value.id, platform: response.value.platform});
  response.value.state = "READY";
}

const rejectResponse = async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.rejectResponse({ id: response.value.id, platform: response.value.platform});
  response.value.state = "REJECTED";
}
</script>

<template>
  <div class="flex flex-row gap-2">
    <FloatLabel variant="on" class="basis-1/3">
      <label for="review">Отзыв клиента</label>
      <Textarea id="review" v-model="response.review" readonly class="size-full"/>
    </FloatLabel>
    <div class="basis-2/3">
      <InputGroup v-if="response.state === 'PROCESSED'" class="flex flex-row-reverse gap-6">
        <Button @click="approveResponse">Опубликовать</Button>
        <Button @click="rejectResponse">Отклонить</Button>
      </InputGroup>
      <FloatLabel variant="on" class="size-full">
        <label for="response">Ответ для публикации</label>
        <Textarea id="response" v-model="response.response" class="w-full"
                  @update:model-value="modified = true" :disabled="response.state !== 'PROCESSED'"/>
      </FloatLabel>
    </div>
  </div>
</template>
