<script setup lang="ts">
import {v4 as uuid} from 'uuid';
import {onMounted, ref} from "vue";
import {BusinessAiControllerClient, PublicationStrategy} from "~/utils/apiQueries.ts";
import {ApiHttpClient} from "~/utils/clientProvider.ts";

const route = useRoute();
const publicationStrategies = ref([] as Array<PublicationStrategy>);

onMounted(async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  publicationStrategies.value = await client.getPublicationPlans(<string>route.params.orgName);
});

const addPublicationStrategy = () => {
  publicationStrategies.value.push(new PublicationStrategy({
    cronExpression: "",
    assortments: [],
    prompt: {
      providerType: "MISTRAL",
      kind: "PUBLICATION",
      content: "",
      id: uuid()
    },
    name: ""
  }));
}

const savePublicationStrategy = async (strategy: PublicationStrategy) => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.savePublicationPlan(strategy);
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Список планов генерации публикаций с помощью искусственного интеллекта</h3>
      </template>
      <template #end>
        <Button @click="addPublicationStrategy">Добавить новый план</Button>
      </template>
    </Toolbar>
    <Fieldset v-for="plan in publicationStrategies">
      <template #legend>
        <div class="flex items-center pl-2">
          <Button v-if="prompt.modified" @click="savePrompt(prompt)">Сохранить</Button>
        </div>
      </template>
      <PromptInfo v-model:modified="prompt.modified" :prompt="prompt"/>
    </Fieldset>
  </div>
</template>