import {getUserInfo,isActive,LoginData,RegistrationData,UserInfo} from '../utils/authUtils.ts';
import {defineStore} from 'pinia';
import {encode} from 'js-base64';
import {Md5} from 'ts-md5';

const runtimeConfig = useRuntimeConfig();

export const useLoginStore = defineStore('loginData', {
    state: () => ({
        refreshToken: null,
        accessToken: null
    }),
    getters: {
        authenticated: (tokens): boolean => {
            if(tokens.accessToken === null || tokens.accessToken.empty) { return false; }
            return isActive(tokens.accessToken);
        },
        userInfo: (tokens): UserInfo | null => {
            if(tokens.accessToken === null) { return null; }
            return getUserInfo(tokens.accessToken);
        }
    },
    actions: {
        async doRegistration(registrationData: RegistrationData) {
            try { const {data} = await useFetch(runtimeConfig.app.authAdminUrl + 'registration',
                { "method": "POST", "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(registrationData)})
                return data.value !== null;
            } catch (e) { console.log(e); }
            return false;
        },
        async doRestorePassword(data: string) {
            try { const request = { "application": "business-ai", "userName": data }
                await useFetch(runtimeConfig.app.authAdminUrl + 'registration', { "method": "POST",
                              "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(request)})
            } catch (e) { console.log(e); }
        },
        async doLogin(loginData: LoginData) {
            try { const request = { "application": "business-ai", "authType": "BEARER",
                       "credentials": encode(loginData.login + "::" + Md5.hashStr(loginData.password))}
                const {data,status} = await useFetch(runtimeConfig.app.loginUrl + 'login', { "method": "POST",
                      "headers": { "Content-Type": "application/json" }, "body": JSON.stringify(request)})
                if(status.value === 'success') {
                    // @ts-ignore
                    this.accessToken = data.value.accessToken;
                    // @ts-ignore
                    this.refreshToken = data.value.refreshToken;
                    return true;
                }
            } catch (e) { console.log(e); }
            this.doLogout();
            return false;
        },
        doLogout() {
            this.refreshToken = null;
            this.accessToken = null;
        }
    }
})