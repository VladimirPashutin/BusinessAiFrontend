import {v4 as uuidv4} from "uuid";
import {
    type AddressObject,
    BankingDetails,
    type Department,
    type Governance,
    type HttpClient,
    type Organization,
    type OrganizationRef,
    type PublicationState,
    type RestResponse
} from "./apiQueries.ts";

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
    //@ts-ignore
    }): RestResponse<R> {
        let url = this.host + requestConfig.url;
        if (requestConfig.queryParams !== null && requestConfig.queryParams !== undefined) {
            url = url + "?" + new URLSearchParams(requestConfig.queryParams).toString();
        }
        let bodyData = requestConfig.data;
        if (this.contentType === "application/json" && requestConfig.data !== undefined) {
            bodyData = JSON.stringify(requestConfig.data);
        }
        const { loggedIn } = useUserSession();
        const token = await $fetch("/api/refresh", {"method": "POST"});
        if(token === null || token === undefined) {
            if(loggedIn.value) { navigateTo('/'); }
            else if(bodyData === undefined) {
                //@ts-ignore
                return $fetch(url, { method: requestConfig.method, headers: {
                        "content-type": this.contentType
                    }
                }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
                  navigateTo('/');
                });
            } else {
                //@ts-ignore
                return $fetch(url, { method: requestConfig.method, headers: {
                        "content-type": this.contentType
                    }, body: bodyData
                }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
                  navigateTo('/');
                });
            }
        } else if(bodyData === undefined) {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                    "content-type": this.contentType,
                    "Authorization": token
                }
            }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
              navigateTo('/');
            });
        } else {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                    "content-type": this.contentType,
                    "Authorization": token
                }, body: bodyData
            }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
              navigateTo('/');
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
        const token = await $fetch("/api/refresh", {"method": "POST"});
        const keys = Object.keys(requestConfig.queryParams);
        const data = new FormData();
        keys.forEach(key => { data.append(key, requestConfig.queryParams[key])})
        if(url.startsWith('http')) {
            if (token === null || token === undefined) {
                //@ts-ignore
                return $fetch("", { baseURL: url, method: requestConfig.method, body: data}).
                catch((e) => { console.warn("Ошибка обращения к серверу", e);
                  navigateTo('/');
                });
            } else {
                //@ts-ignore
                return $fetch("", { baseURL: url, method: requestConfig.method, headers: {
                        "Authorization": token
                    }, body: data
                }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
                  navigateTo('/');
                });
            }
        } else if(token === null || token === undefined) {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, body: data}).
            catch((e) => { console.warn("Ошибка обращения к серверу", e);
              navigateTo('/');
            });
        } else {
            //@ts-ignore
            return $fetch(url, { method: requestConfig.method, headers: {
                    "Authorization": token
                }, body: data
            }).catch((e) => { console.warn("Ошибка обращения к серверу", e);
              navigateTo('/');
            });
        }
    }

}

export class PublicationInfoData {
    readyState: PublicationState;
    images: Array<string>;
    description: string;
    title: string;
    note: string;
    id: string;

    constructor(data: PublicationInfoData) {
        this.description = data.description;
        this.readyState = data.readyState;
        this.images = data.images;
        this.title = data.title;
        this.note = data.note;
        this.id = data.id;
    }
}

export const newAddress = (): AddressObject => {
    return {
        value: "",
        id: ""
    }
};

export const departments = (): Department[] => { return [] as Department[] };
export const governance = (): Governance => {
    return {
        kind: "Директор" as GoverningKind,
        organization: null as unknown as OrganizationRef,
        start: Date.now() as unknown as Date,
        end: Date.now() as unknown as Date,
        directorIdList: [] as string[]
    }
};

export const newBankInfo = (ownerId: string, accountName: string): BankingDetails => {
    return { ownerId: ownerId,
        name: accountName,
        correspond: "",
        bankName: "",
        account: "",
        bik: "",
        inn: "",
        kpp: ""
    }
}

export const newBankDetails = (ownerId: string, accountName: string) => {
    let result = [];
    result.push(newBankInfo(ownerId, accountName));
    return result;
}

export const newContact = (contactKind: string): ContactInfo => {
    return { kind: contactKind,
        value: ""
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
        id: uuidv4(),
        okato: "",
        okved: "",
        okopf: "",
        okpo: "",
        ogrn: "",
        okfs: "",
        inn: ""
    }
}

export function truncate(str: string, maxlength: number) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + "…";
    }
    return str;
}

export function getAiClient(): BusinessAiControllerClient {
  const runtimeConfig = useRuntimeConfig();
  return new BusinessAiControllerClient(new ApiHttpClient(runtimeConfig.public.businessHost));
}

export function getCommonDataClient(): CommonDataControllerClient {
  const runtimeConfig = useRuntimeConfig();
  return new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.public.businessHost));
}

export function getCommonClient(contentType: string | undefined = undefined): BusinessCommonControllerClient {
  const runtimeConfig = useRuntimeConfig();
  return new BusinessCommonControllerClient(new ApiHttpClient(runtimeConfig.public.businessHost, contentType));
}

export function getFileSaveClient(): BusinessCommonControllerClient {
  const runtimeConfig = useRuntimeConfig();
  return new BusinessCommonControllerClient(new FileUploadClient(runtimeConfig.public.businessHost));
}