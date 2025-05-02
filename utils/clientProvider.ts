import type {HttpClient} from "./apiQueries.ts";

export class ApiHttpClient implements HttpClient {
    defaultContentType: string;
    contentType: string;
    baseUrl: string;

    constructor(baseUrl: string, defaultContentType = "application/json") {
        this.defaultContentType = defaultContentType;
        this.contentType = defaultContentType;
        this.baseUrl = baseUrl;
    }

    setDefaultContentType() { this.contentType = this.defaultContentType; }

    setContentType(contentType: string) {
        this.contentType = contentType;
    }

    request<R>(requestConfig: { method: string; url: string; queryParams?: any;
                                data?: any; copyFn?: (data: R) => R; }): RestResponse<R> {
        let url = this.baseUrl + requestConfig.url;
        const { session } = useUserSession();
        const accessToken = session.value.jwt?.accessToken;
        if(requestConfig.queryParams !== null && requestConfig.queryParams !== undefined)
        { url = url + "?" + new URLSearchParams(requestConfig.queryParams).toString(); }
        // @ts-ignore
        return $fetch(url, {method: requestConfig.method, headers: { "Content-Type": this.contentType,
                           "Authorization": accessToken }, body: requestConfig.data})
    }

}

export class AuthHttpClient implements HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any;
        data?: any; copyFn?: (data: R) => R; }): RestResponse<R> {
        const runtimeConfig = useRuntimeConfig();
        let url = runtimeConfig.app.loginUrl + requestConfig.url;
        if(requestConfig.queryParams !== null && requestConfig.queryParams !== undefined)
        { url = url + "?" + new URLSearchParams(requestConfig.queryParams).toString(); }
        // @ts-ignore
        return $fetch(url, {method: requestConfig.method, body: requestConfig.data})
    }

}

export class RegistrationHttpClient implements HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any;
                                data?: any; copyFn?: (data: R) => R; }): RestResponse<R> {
        const runtimeConfig = useRuntimeConfig();
        let url = runtimeConfig.app.registrationUrl + requestConfig.url;
        if(requestConfig.queryParams !== null && requestConfig.queryParams !== undefined)
        { url = url + "?" + new URLSearchParams(requestConfig.queryParams).toString(); }
        // @ts-ignore
        return $fetch(url, {method: requestConfig.method, body: JSON.stringify(requestConfig.data),
                            headers: {'Content-Type': 'application/json'}})
    }

}
