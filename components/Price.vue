<script setup lang="ts">
import {toRef} from "vue";
import type {Price} from "~/utils/apiQueries.ts";

const props = defineProps<{price: Price}>();
const price = toRef(props, 'price');
</script>

<template>
  <div style="white-space: pre-wrap">
    <span>{{price.name}}</span> <span class="text-xl font-semibold">{{price.value}}</span> <span>({{price.currency}})</span>
  </div>
</template>
