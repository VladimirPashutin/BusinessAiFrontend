<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {type Organization, BusinessAiControllerClient, BusinessCommonControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const processLoading = ref(false);
const publicationsCount = ref(100);
const organization = ref(null as any as Organization);
const publications = ref([] as PublicationsResponse[]);
const canRequestPublication = ref(false);
const requestTimeout = 30000;

onMounted(async () => {
  processLoading.value = true;
  const runtimeConfig = useRuntimeConfig();
  const commonClient = new BusinessCommonControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  const businessClient = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  organization.value = await commonClient.getOrganizationByName(<string>route.params.orgName);
  publicationsCount.value = await businessClient.getAllPublicationsCount();
  publications.value = Array.from({length: publicationsCount.value});
  await loadPublications({ first: 0, last: Math.min(publicationsCount.value, 100)})
});

const loadPublications = async (event: { first: number, last: number }) => {
  processLoading.value = true;
  const {first, last} = event;
  let offset = first;
  let limit = last - first;
  if(Number.isNaN(first)) { offset = 0; }
  if(Number.isNaN(first) || Number.isNaN(last))
  { limit = publicationsCount.value; }
  const runtimeConfig = useRuntimeConfig();
  const _items = [...publications.value] as PublicationsResponse[];
  const controllerClient = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  const loadedItems = await controllerClient.getAllPublications({ offset: offset, limit: limit});
  _items.splice(offset, limit, ...loadedItems);
  publications.value = _items;
  processLoading.value = false;
};

const deletePublication = async (publication: PublicationsResponse, index: number) => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.rejectPublication(publication.id);
  publications.value.splice(index, 1);
}

const requestPublication = () => {
  canRequestPublication.value = true;
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  setTimeout(() => { canRequestPublication.value = false; reloadNuxtApp(); }, requestTimeout);
  client.requestPublication(organization.value.id);
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Список ваших публикаций</h3>
      </template>
      <template #end>
        <Button :disabled="canRequestPublication" @click="requestPublication">Подготовить публикацию</Button>
      </template>
    </Toolbar>
    <VirtualScroller :items="publications" :itemSize="50" :loading="processLoading" show-loader
                      lazy @lazy-load="loadPublications">
      <template v-slot:item="{item, options}">
        <Fieldset :legend="item.title" toggleable collapsed>
          <PublicationInfo :publication="item" :index="options.index" @reject="deletePublication"/>
        </Fieldset>
      </template>
    </VirtualScroller>
  </div>
</template>