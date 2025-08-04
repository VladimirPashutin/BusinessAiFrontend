export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            apiProvider: (baseUrl: string) => {
                const { session } = useUserSession();
                return $fetch.create({
                    baseURL: baseUrl,
                    onRequest({ request, options, error }) {
                        if (session.value?.jwt) {
                            options.headers.set('Authorization', '${session.value?.jwt.accessToken}')
                        }
                    },
                    async onResponseError({ response }) {
                        if (response.status === 401) {
                            await nuxtApp.runWithContext(() => navigateTo('/login'))
                        }
                    }
                })
            }
        }
    }
})
