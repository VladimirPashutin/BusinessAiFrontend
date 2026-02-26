<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {GoodsCatalog} from '~/utils/apiQueries.ts';
import {getCommonDataClient} from '~/utils/clientProvider.ts';

const catalog = ref(null as unknown as GoodsCatalog)

onMounted(async () => {
  catalog.value = await getCommonDataClient().getCatalog('39f58bb6-2d6e-4e8c-992f-e1dd1ac3b46b');
})

const header = computed(() => {
  if(catalog.value === null || catalog.value === undefined || catalog.value.name === null) {
    return 'Каталог тарифов для услуг, предоставляемых компанией ООО "Технологии третьего тысячелетия"'
  }
  return catalog.value.name;
})

const description = computed(() => {
  if(catalog.value === null || catalog.value === undefined || catalog.value.description === null) {
    return ''
  }
  return catalog.value.description;
})

const positions = computed(() => {
  if(catalog.value === null || catalog.value === undefined || catalog.value.catalogPosition === null) {
    return []
  }
  return catalog.value.catalogPosition;
})
</script>

<template>
  <Panel :header = "header" class="w-full">
    <p>{{ description }}</p>
    <CatalogPosition v-for="position in positions" :position="position"/>
  </Panel>
</template>
