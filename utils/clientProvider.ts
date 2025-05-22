import {jwtDecode} from "jwt-decode";
import type { HttpClient, AddressObject, Department, Governance,
              Organization, OrganizationRef, RestResponse
} from "./apiQueries.ts";

const refreshTokens = async () => {
    const {loggedIn, session} = useUserSession();
    if (loggedIn.value) {
        const accessToken = session.value.jwt?.accessToken as string;
        const accessExpiration = jwtDecode(accessToken).exp as number;
        if (1000 * accessExpiration < Date.now() + 10000) {
            await $fetch('/api/refresh', {method: 'POST'});
        }
        return accessToken;
    }
    return null;
}

export class ApiHttpClient implements HttpClient {
    contentType: string;

    constructor(contentType = "application/json") {
        this.contentType = contentType;
    }

    async request<R>(requestConfig: {
        method: string; url: string; queryParams?: any;
        data?: any; copyFn?: (data: R) => R;
    }): RestResponse<R> {
        let url = "/" + requestConfig.url;
        if (requestConfig.queryParams !== null && requestConfig.queryParams !== undefined) {
            url = url + "?" + new URLSearchParams(requestConfig.queryParams).toString();
        }
        let bodyData = requestConfig.data;
        if (this.contentType === "application/json") {
            bodyData = JSON.stringify(requestConfig.data);
        }
        const token = await refreshTokens();
        if(token === null) {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                    "content-type": this.contentType
                }, body: bodyData
            });
        } else {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                    "content-type": this.contentType,
                    "Authorization": token
                }, body: bodyData
            });
        }
    }

}

export class FileUploadClient implements HttpClient {

    async request<R>(requestConfig: {method: string; url: string; queryParams?: any;
                                     data?: any; copyFn?: (data: R) => R }): RestResponse<R> {
        if(requestConfig.queryParams === null) { return new Promise<R>(() => {}); }
        const token = await refreshTokens();
        const keys = Object.keys(requestConfig.queryParams);
        let url = "/" + requestConfig.url;
        const data = new FormData();
        keys.forEach(key => { data.append(key, requestConfig.queryParams[key])})
        if (token === null) {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, body: data});
        } else {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                                "Authorization": token
                }, body: data
            });
        }
    }

}

const postAddress = (): AddressObject => {
    return {
        value: "Адрес не указан",
        id: ""
    }
};
const lowAddress = (): AddressObject => {
    return {
        value: "Адрес не указан",
        id: ""
    }
};
// const strategies = (): AiStrategy[] => { return [] as AiStrategy[] };
// const contacts = (): ContactInfo[] => { return [] as ContactInfo[] };
const departments = (): Department[] => { return [] as Department[] };
const orgRef = (): OrganizationRef => {
    return {
        value: "Организация не указана",
        id: ""
    }
};
const governance = (): Governance => {
    return {
        kind: "Директор" as GoverningKind,
        start: Date.now() as unknown as Date,
        end: Date.now() as unknown as Date,
        director: [] as string[],
        organization: orgRef()
    }
};

export const newOrganization = (): Organization => {
    return {
        fullOrganizationName: "Организация не указана",
        strictOrgName: "Организация не указана",
        postAddress: postAddress(),
        department: departments(),
        governance: governance(),
        lowAddress: lowAddress(),
        okato: "",
        okonh: "",
        okopf: "",
        okpo: "",
        ogrn: "",
        okfs: "",
        inn: "",
        id: ""
    }
}
