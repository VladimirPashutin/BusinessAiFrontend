<script setup lang="ts">
import {toRef} from "vue";

const props = defineProps<{publicationPlan: PublicationStrategy, index: number}>();
const publicationPlan = toRef(props, 'publicationPlan');
const modified = defineModel('modified');
</script>

<template>
  <div class="flex flex-row gap-2">

  </div>
</template>
