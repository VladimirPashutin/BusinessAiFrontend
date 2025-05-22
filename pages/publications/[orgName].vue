<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {type Organization, BusinessAiControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const processLoading = ref(false);
const organization = ref(null as Organization);
const publications = ref([] as PublicationsResponse[]);

onMounted(async () => {
  processLoading.value = true;
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  const businessClient = new BusinessAiControllerClient(new ApiHttpClient());
  organization.value = await commonClient.getOrganization(<string>route.params.orgName);
  const _items = publications.value;
  const publicationsCount = await businessClient.getAllPublicationsCount();
  publications.value = Array.from({length: publicationsCount});
  publications.value.splice(0, _items.length, ..._items);
});

const loadPublications = async (event) => {
  const {loggedIn} = useUserSession();
  processLoading.value = true;
  if(loggedIn.value) {
    let offset = 0;
    let limit = 100;
    const { first, last } = event;
    if(!(Number.isNaN(first))) { offset = 0; }
    if(!(Number.isNaN(last))) { limit = last - first; }
    const _items = [...publications.value] as PublicationsResponse[];
    const controllerClient = new BusinessAiControllerClient(new ApiHttpClient());
    const loadedItems = await controllerClient.getAllPublications({ offset: offset, limit: limit});
    _items.splice(offset, limit, ...loadedItems);
    publications.value = _items;
  } else {
    publications.value = [] as PublicationsResponse[];
  }
  processLoading.value = false;
};

</script>

<template>
  <div class="details-table autowidth">
    <DataTable :value="publications" scrollable scrollHeight="400px" table-style="min-width: 100rem"
               :virtual-scroller-options="{ lazy: true, onLazyLoad: loadPublications, showLoader: true,
                                            loading: processLoading }">
      <Column field="note" header="Текст публикации">
        <!--        <template #loading>-->
        <!--          <div class="flex items-center" :style="{ 'flex-grow': '1', overflow: 'hidden' }">-->
        <!--            <Skeleton width="60%" height="1rem" />-->
        <!--          </div>-->
        <!--        </template>-->
      </Column>
      <Column header="Изображения">
        <template #body="slotProps">
          <label>{{slotProps.data.images}}</label>
          <!--          <Galleria :value="loadImages(${slotProps.data.images})" :num-visible="1">-->
          <!--            <template #thumbnail="slotProps">-->
          <!--              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />-->
          <!--            </template>-->
          <!--          </Galleria>-->
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style>
.autowidth {
  width: 80%;
}
</style>