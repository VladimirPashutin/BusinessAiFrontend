import {jwtDecode} from "jwt-decode";
import { type HttpClient, type AddressObject, type Department, type Governance,
         type Organization, type OrganizationRef, type RestResponse, BankingDetails
} from "./apiQueries.ts";

export const refreshTokens = async () => {
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
    host: string;

    constructor(host: string, contentType = "application/json") {
        this.contentType = contentType;
        this.host = host;
    }

    async request<R>(requestConfig: {
        method: string; url: string; queryParams?: any;
        data?: any; copyFn?: (data: R) => R;
    }): RestResponse<R> {
        let url = this.host + requestConfig.url;
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
    host: string;

    constructor(host: string) { this.host = host; }

    async request<R>(requestConfig: {method: string; url: string; queryParams?: any;
                                     data?: any; copyFn?: (data: R) => R }): RestResponse<R> {
        if(requestConfig.queryParams === null) { return new Promise<R>(() => {}); }
        let url = this.host + requestConfig.url;
        const token = await refreshTokens();
        const keys = Object.keys(requestConfig.queryParams);
        const data = new FormData();
        keys.forEach(key => { data.append(key, requestConfig.queryParams[key])})
        if (url.startsWith('http')) {
            if (token === null) {
                //@ts-ignore
                return $fetch("", { baseURL: url, method: requestConfig.method, body: data});
            } else {
                //@ts-ignore
                return $fetch("", { baseURL: url, method: requestConfig.method, headers: {
                        "Authorization": token
                    }, body: data
                });
            }
        } else {
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

}

export const newAddress = (): AddressObject => {
    return {
        value: "",
        id: ""
    }
};

// const strategies = (): AiStrategy[] => { return [] as AiStrategy[] };
// const contacts = (): ContactInfo[] => { return [] as ContactInfo[] };
export const departments = (): Department[] => { return [] as Department[] };
export const governance = (): Governance => {
    return {
        kind: "Директор" as GoverningKind,
        organization: null as unknown as OrganizationRef,
        start: Date.now() as unknown as Date,
        end: Date.now() as unknown as Date,
        director: [] as string[]
    }
};

export const newBankInfo = (owner: string): BankingDetails => {
    return {
        ownerId: owner,
        correspond: "",
        bankName: "",
        account: "",
        name: "",
        bik: "",
        inn: "",
        kpp: ""
    }
}

export const newOrganization = (): Organization => {
    return {
        fullOrganizationName: "Организация не указана",
        strictOrgName: "Организация не указана",
        department: departments(),
        postAddress: newAddress(),
        lowAddress: newAddress(),
        governance: governance(),
        bankDetails: [],
        contacts: [],
        okato: "",
        okved: "",
        okopf: "",
        okpo: "",
        ogrn: "",
        okfs: "",
        inn: "",
        id: ""
    }
}
