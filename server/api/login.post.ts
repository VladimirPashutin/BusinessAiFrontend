import {readRawBody} from "h3";
import {jwtDecode} from "jwt-decode";
import {LoginRequest} from "~/utils/apiQueries";

export default defineEventHandler(async (event) => {
    try { const runtimeConfig = useRuntimeConfig();
        const credentials = await readRawBody(event) as string;
        const loginRequest = new LoginRequest({application: runtimeConfig.public.applicationName,
                                               credentials: credentials, authType: "BEARER", params: {}});
        console.log("Login by " + runtimeConfig.public.innerAuthHost);
        console.log("Base host " + runtimeConfig.public.aiHost);
        // @ts-ignore
        const data: UserSession.jwt = await $fetch(runtimeConfig.public.innerAuthHost + "auth/login",
             { method: "POST", body: JSON.stringify(loginRequest),
                    headers: { "content-type": "application/json" } })
        if(data.accessToken !== null && data.refreshToken !== null) {
            const jwt = jwtDecode(data.accessToken);
            await setUserSession(event, {
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
    } catch(e) { console.error("Ошибка входа в систему", e);
        throw createError({statusCode: 403 })
    }
    await clearSession(event, {});
})