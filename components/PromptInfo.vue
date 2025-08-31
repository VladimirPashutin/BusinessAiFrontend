<script setup lang="ts">
import {toRef} from "vue";
import {Prompt} from "~/utils/apiQueries.ts";

const modified = defineModel('modified');
const props = defineProps<{prompt: Prompt}>();
const prompt = toRef(props, 'prompt');
</script>

<template>
  <div class="flex flex-row gap-2">
    <FloatLabel variant="on" class="w-full">
      <label for="review">Фраза для запроса к искусственному интеллекту</label>
      <Textarea id="review" v-model="prompt.content" @update:model-value="modified = true"
                class="w-full" style="min-height: 200px"/>
    </FloatLabel>
  </div>
</template>
