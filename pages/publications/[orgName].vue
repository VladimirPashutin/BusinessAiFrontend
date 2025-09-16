<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import PublicationInfo from "~/components/PublicationInfo.vue";
import {
  type Assortment,
  BusinessAiControllerClient,
  BusinessCommonControllerClient,
  type Organization
} from "~/utils/apiQueries.ts";

const route = useRoute();
const processLoading = ref(false);
const publicationsCount = ref(100);
const selectedImageName = ref(null);
const imageNameList = ref([] as string[]);
const assortmentList = ref([] as Assortment[]);
const selectedAssortment = ref(null as unknown as Assortment)
const publications = ref([] as PublicationsResponse[]);
const organization = ref(null as any as Organization);
const canNotRequestPublication = ref(false);

onMounted(async () => {
  processLoading.value = true;
  const runtimeConfig = useRuntimeConfig();
  const commonClient = new BusinessCommonControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  const businessClient = new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  organization.value = await commonClient.getOrganizationByName(<string>route.params.orgName);
  assortmentList.value = await commonClient.getAssortmentList(organization.value.id);
  publicationsCount.value = await businessClient.getAllPublicationsCount();
  publications.value = Array.from({length: publicationsCount.value});
  await loadPublications({ first: 0, last: Math.min(publicationsCount.value, 100)})
});

const selectImageNames = async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new BusinessCommonControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  imageNameList.value = await client.getAssortmentImages(selectedAssortment.value.id);
  selectedImageName.value = null;
}

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

const requestPublication = async () => {
  canNotRequestPublication.value = true;
  const runtimeConfig = useRuntimeConfig();
  const client = new ApiHttpClient(runtimeConfig.app.publicationHost);
  let uri = "publication/" + encodeURIComponent(organization.value.strictOrgName);
  if(selectedAssortment.value !== null) {
    uri = uri + "/" + encodeURIComponent(selectedAssortment.value.id);
    if(selectedImageName.value !== null)
    { uri = uri + "/" + encodeURIComponent(selectedImageName.value); }
  }
  try { await client.request({method: "POST", url: uri}); }
  finally { canNotRequestPublication.value = false; }
  reloadNuxtApp();
}
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Список ваших публикаций</h3>
      </template>
      <template #end>
        <Select v-model="selectedAssortment" :options="assortmentList"
                optionLabel="name" placeholder="Укажите продукт/услугу" @change="selectImageNames"/>
        <Select v-model="selectedImageName" :options="imageNameList" placeholder="Укажите изображение"/>
        <Button :disabled="canNotRequestPublication" @click="requestPublication">Подготовить публикацию</Button>
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