<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ApiHttpClient } from '~/utils/clientProvider.ts';
import { CommonDataControllerClient } from '~/utils/apiQueries.ts';

const catalog = ref(null as unknown as GoodsCatalog)

onMounted(async () => {
  const runtimeConfig = useRuntimeConfig();
  const client = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  catalog.value = await client.getCatalog('39f58bb6-2d6e-4e8c-992f-e1dd1ac3b46b');
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
  if(catalog.value === null || catalog.value === undefined || catalog.value.catalogPositions === null) {
    return []
  }
  return catalog.value.catalogPositions;
})
</script>

<template>
  <Panel :header = "header" class="w-full">
    <p>{{ description }}</p>
    <CatalogPosition v-for="position in positions" :position="position"/>
  </Panel>
</template>
