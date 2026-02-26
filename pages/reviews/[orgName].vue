<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Organization} from "~/utils/apiQueries.ts";
import {getAiClient, getCommonClient} from "~/utils/clientProvider.ts";

const route = useRoute();
const processLoading = ref(false);
const responses = ref([] as GeneratedResponse[]);
const organization = ref(null as any as Organization);

onMounted(async () => {
  processLoading.value = true;
  organization.value = await getCommonClient().getOrganizationByName(<string>route.params.orgName);
  const responsesCount = await getAiClient().getAllResponsesCount();
  responses.value = Array.from({length: responsesCount});
  await loadResponses({ first: 0, last: Math.min(responsesCount, 100)})
});

const loadResponses = async (event: { first: number, last: number }) => {
  const {first, last} = event;
  if(Number.isNaN(first) || Number.isNaN(last))
  { return; }
  let offset = first;
  let limit = last - first;
  processLoading.value = true;
  const _items = [...responses.value] as GeneratedResponse[];
  const loadedItems = await getAiClient().getAllResponses({ offset: offset, limit: limit});
  _items.splice(offset, limit, ...loadedItems);
  responses.value = _items;
  processLoading.value = false;
};

const deleteResponse = async (response: GeneratedResponse, index: number) => {
  await getAiClient().rejectResponse({id: response.id, platform: response.platform});
  responses.value.splice(index, 1);
}

const makeTitle = (response: GeneratedResponse) => {
  return "Отзыв пользователя " + response.client + " от " + response.createdAt +
         " с рейтингом " + response.rate;
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Список отзывов от ваших пользователей</h3>
      </template>
    </Toolbar>
    <VirtualScroller :items="responses" :itemSize="50" :loading="processLoading" show-loader
                      lazy @lazy-load="loadResponses">
      <template v-slot:item="{item, options}">
        <Fieldset :legend="makeTitle(item)" toggleable collapsed>
          <ReviewInfo :response="item" :index="options.index" :org-name="organization.strictOrgName"
                      @reject="deleteResponse"/>
        </Fieldset>
      </template>
    </VirtualScroller>
  </div>
</template>
