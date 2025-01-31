// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-01-31",

    devtools: {enabled: true},

    modules: ['@pinia/nuxt', '@primevue/nuxt-module', '@nuxtjs/tailwindcss'],

    primevue: {},

    routeRules: {
        '/': {prerender: true}
    },

    typescript: {
        strict: false
    }
})