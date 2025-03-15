import {AuthAdministrationControllerClient, type HttpClient, type RestResponse} from './userAdministration.ts';
import {prepareUserAdminUrl,prepareHeaders} from "~/utils/clientProvider.ts";

const mainHttpClient: HttpClient = new class implements HttpClient {
    async request<R>(requestConfig: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "get" | "post" | "put" | "delete";
        url: string;
        queryParams?: any;
        data?: any;
        copyFn?: (data: R) => R
    }): RestResponse<R> {
        try { const {data} = await useFetch(prepareUserAdminUrl(requestConfig.url, requestConfig.queryParams),
                    {"method": requestConfig.method, "headers": prepareHeaders(),
                     "body": JSON.stringify(requestConfig.data)});
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

export default new AuthAdministrationControllerClient(mainHttpClient);