<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Страница не найдена'
})

useHead({
  htmlAttrs: {
    lang: 'ru'
  }
})

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<style scoped>

</style>