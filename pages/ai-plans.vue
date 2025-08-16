<script setup lang="ts">
import {v4 as uuid} from 'uuid';
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {AiStrategy, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const aiStrategies = ref([] as Array<AiStrategy>);

onMounted(async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  aiStrategies.value = await client.getPlans(<string>route.params.orgName);
});

const promptKinds = ref([
  { name: "Описание изображения для продукта/услуги", value: "IMAGE_DESCRIPTION" },
  { name: "Формирование публикации для продукта/услуги", value: "PUBLICATION" },
  { name: "Формирование ответа на отзыв пользователя", value: "RESPONSE" }
]);

const addPrompt = () => {
  prompts.value.push(new Prompt({
    providerType: "MISTRAL",
    kind: "PUBLICATION",
    modified: false,
    content: "",
    id: uuid()
  }));
}

const savePrompt = async (prompt: Prompt) => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.savePrompt(prompt);
  prompt.modified = false;
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Список промптов для искусственного интеллекта</h3>
      </template>
      <template #end>
        <Button @click="addPrompt">Добавить новый промпт</Button>
      </template>
    </Toolbar>
    <Fieldset v-for="prompt in prompts">
      <template #legend>
        <div class="flex items-center pl-2">
          <Select v-model="prompt.kind" :options="promptKinds" @value-change="prompt.modified = true"
                  placeholder="Укажите тип промпта" option-label="name" option-value="value" fluid/>
          <Button v-if="prompt.modified" @click="savePrompt(prompt)">Сохранить</Button>
        </div>
      </template>
      <PromptInfo v-model:modified="prompt.modified" :prompt="prompt"/>
    </Fieldset>
  </div>
</template>