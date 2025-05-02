import {jwtDecode} from "jwt-decode";
import type {UserSession} from "#auth-utils";
import {RefreshRequest} from "~/utils/apiQueries";

export default defineEventHandler(async (event) => {
    const session: UserSession = await getUserSession(event);
    const tokens = session?.jwt;
    if(tokens === null || tokens === undefined) { return; }
    const accessExpiration = jwtDecode(tokens.accessToken).exp;
    const refreshExpiration = jwtDecode(tokens.refreshToken).exp;
    if(accessExpiration === undefined || refreshExpiration === undefined || 1000 * refreshExpiration < Date.now()) {
        await clearUserSession(event);
        return;
    }
    const runtimeConfig = useRuntimeConfig();
    if(1000 * refreshExpiration < Date.now() + 30000) {
        const request: RefreshRequest = new RefreshRequest({
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken
        })
        const data: UserSession["jwt"] = await $fetch(runtimeConfig.app.loginUrl + "auth/refresh",
            { method: "POST", body: JSON.stringify(request) })
        if(data === undefined) { await clearUserSession(event); return; }
        if(data.accessToken !== null && data.refreshToken !== null) {
            const jwt = jwtDecode(data.accessToken);
            await replaceUserSession(event, {
                user: {
                    // @ts-ignore
                    communities: jwt['communities'],
                    // @ts-ignore
                    name: jwt['userName'],
                    // @ts-ignore
                    roles: jwt['roles']
                },
                jwt: {
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken
                }
            })
            return;
        }
    } else if(1000 * accessExpiration < Date.now() + 10000) {
        const accessToken = await $fetch(runtimeConfig.app.loginUrl + "auth/token",
            { method: "POST", body: tokens.refreshToken }).catch((e) => {
                console.warn("Ошибка обновления токена", e);
                clearUserSession(event);
        })
        if(accessToken === undefined || accessToken === null) { return; }
        const jwt = jwtDecode(<string>accessToken);
        await replaceUserSession(event, {
            user: {
                // @ts-ignore
                communities: jwt['communities'],
                // @ts-ignore
                name: jwt['userName'],
                // @ts-ignore
                roles: jwt['roles']
            },
            jwt: {
                refreshToken: tokens.refreshToken,
                accessToken: <string>accessToken
            }
        })
    }
})