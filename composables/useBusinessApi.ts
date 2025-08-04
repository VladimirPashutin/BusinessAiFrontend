import type { UseFetchOptions } from 'nuxt/app'

export default function useBusinessApi<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
) {
    const runtimeConfig = useRuntimeConfig();
    const { $apiProvider } = useNuxtApp()
    return useFetch(url, {
        ...options,
        // @ts-ignore
        $fetch: $apiProvider(runtimeConfig.app.businessApiUrl) as typeof $fetch
    })
}