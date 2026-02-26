<script setup lang="ts">
import {onMounted, ref} from "vue";
import PublicationInfo from "~/components/PublicationInfo.vue";
import {type Assortment, type Organization} from "~/utils/apiQueries.ts";
import {ApiHttpClient, PublicationInfoData, getAiClient, getCommonClient, getCommonDataClient} from "~/utils/clientProvider.ts";

const route = useRoute();
const processLoading = ref(false);
const publicationsCount = ref(100);
const selectedImageName = ref(null);
const imageNameList = ref([] as string[]);
const assortmentList = ref([] as Assortment[]);
const organization = ref(null as any as Organization);
const selectedAssortment = ref(null as unknown as Assortment)
const publications = ref([] as PublicationInfoData[]);
const canNotRequestPublication = ref(false);

onMounted(async () => {
  processLoading.value = true;
  organization.value = await getCommonClient().getOrganizationByName(<string>route.params.orgName);
  assortmentList.value = await getCommonClient().getAssortmentList(organization.value.id);
  publicationsCount.value = await getAiClient().getAllPublicationsCount();
  publications.value = Array.from({length: publicationsCount.value});
  await loadPublications({ first: 0, last: Math.min(publicationsCount.value, 100)})
});

const selectImageNames = async () => {
  imageNameList.value = await getCommonClient().getAssortmentImages(selectedAssortment.value.id);
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
  let loadedPublications = [] as PublicationInfoData[];
  const _items = [...publications.value] as PublicationInfoData[];
  const loadedItems = await getAiClient().getAllPublications({ offset: offset, limit: limit});
  for(let i = 0; i < loadedItems.length; i++) {
    const publication = loadedItems[i];
    const data = new PublicationInfoData({
      description: (await getCommonClient().getAssortment(publication.assortmentId)).description,
      readyState: publication.readyState,
      title: publication.title,
      note: publication.note,
      id: publication.id,
      images: [],
    })
    for(let j = 0; j < publication.images.length; j++) {
      const imageBody = <Blob>await getCommonDataClient().getImage(publication.images[j]);
      if(imageBody.size > 0) { data.images.push(URL.createObjectURL(imageBody)); }
    }
    loadedPublications.push(data);
  }
  _items.splice(offset, limit, ...loadedPublications);
  processLoading.value = false;
  publications.value = _items;
};

const deletePublication = async (publication: PublicationInfoData, index: number) => {
  await getAiClient().rejectPublication(publication.id);
  publications.value.splice(index, 1);
}

const requestPublication = async () => {
  canNotRequestPublication.value = true;
  const runtimeConfig = useRuntimeConfig();
  const publicationClient = new ApiHttpClient(runtimeConfig.public.publicationHost);
  let uri = "publication/" + organization.value.strictOrgName;
  if(selectedAssortment.value !== null) {
    uri = uri + "/" + selectedAssortment.value.id;
    if(selectedImageName.value !== null)
    { uri = uri + "|" + selectedImageName.value; }
  }
  try { await publicationClient.request({method: "POST", url: uri}); }
  catch (error: unknown) { console.error("Can not make publication ", error); }
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