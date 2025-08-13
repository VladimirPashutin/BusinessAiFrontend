<script setup lang="ts">
import {toRef} from "vue";
import type {CatalogPosition} from "~/utils/apiQueries.ts";

const props = defineProps<{position: CatalogPosition}>();
const pos = toRef(props, 'position');
</script>

<template>
  <Card>
    <template #header>
      <img v-for="image in pos.images" alt="Изображение" :src="image"/>
    </template>
    <template #title>{{pos.name}}</template>
    <template #content>
      <p class="m-0" v-html="pos.description"/>
    </template>
    <template #footer>
      <div class="flex flex-col gap-4">
        <Price v-for="price in pos.prices" :price="price"/>
      </div>
    </template>
  </Card>
</template>
