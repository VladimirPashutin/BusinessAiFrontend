<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {type Organization, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const publicationsCount = ref(100);
const processLoading = ref(false);
const organization = ref(null as any as Organization);
const publications = ref([] as PublicationsResponse[]);

onMounted(async () => {
  processLoading.value = true;
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  const businessClient = new BusinessAiControllerClient(new ApiHttpClient());
  organization.value = await commonClient.getOrganization(<string>route.params.orgName);
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
  const _items = [...publications.value] as PublicationsResponse[];
  const controllerClient = new BusinessAiControllerClient(new ApiHttpClient());
  const loadedItems = await controllerClient.getAllPublications({ offset: offset, limit: limit});
  _items.splice(offset, limit, ...loadedItems);
  publications.value = _items;
  processLoading.value = false;
};

const deletePublication = async (publication: PublicationsResponse, index: number) => {
  const client = new BusinessAiControllerClient(new ApiHttpClient());
  await client.rejectPublication(publication.id);
  publications.value.splice(index, 1);
}
</script>

<template>
  <div class="w-full">
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