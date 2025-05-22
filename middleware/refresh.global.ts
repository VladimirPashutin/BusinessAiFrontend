export default defineNuxtRouteMiddleware(async (to, from) => {
    const {loggedIn} = useUserSession();
    if (loggedIn.value) {
        await $fetch('/api/refresh', {method: 'POST'});
        const {fetch: refreshSession} = useUserSession();
        await refreshSession();
        if (!loggedIn.value) {
            return navigateTo('/');
        }
    }
});