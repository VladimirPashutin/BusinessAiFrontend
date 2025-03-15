import {BusinessAiControllerClient, CommonDataControllerClient, type HttpClient, type RestResponse} from './businessQueries.ts';
import useBusinessApi from "~/composables/useBusinessApi.js";

const mainHttpClient: HttpClient = new class implements HttpClient {
    async request<R>(requestConfig: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "get" | "post" | "put" | "delete";
        url: string;
        queryParams?: any;
        data?: any;
        copyFn?: (data: R) => R
    }): RestResponse<R> {
        try { const {data} = await useBusinessApi(requestConfig.url);
            if(data === null || data === undefined) { return; }
            // @ts-ignore
            const result: R = data.value;
            if(requestConfig.copyFn === null || requestConfig.copyFn === undefined)
            { return Promise.resolve(result); }
            return Promise.resolve(requestConfig.copyFn(result));
        } catch(e) { console.error(e); }
        return Promise.resolve(undefined);
    }
}

export const businessCommonClient = new CommonDataControllerClient(mainHttpClient);

export const businessAiClient = new BusinessAiControllerClient(mainHttpClient);