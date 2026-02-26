<script setup lang="ts">
import * as authUtils from "./auth.d.ts"
const title = 'Бизнес-помощник'
const description = 'Система продвижения бизнеса на основе искусственного интеллекта.'

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ru'
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
