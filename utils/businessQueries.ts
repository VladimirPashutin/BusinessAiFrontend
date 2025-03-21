/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

export class PaginationQuery {
    order: OrderInfo[];
    offset: number;
    limit: number;

    constructor(data: PaginationQuery) {
        this.order = data.order;
        this.offset = data.offset;
        this.limit = data.limit;
    }
}

/**
 * Тип для списка адресуемых объектов
 */
export class AddressObjectList {
    addressObject: AddressObject[];

    constructor(data: AddressObjectList) {
        this.addressObject = data.addressObject;
    }
}

export class ReviewForResponse {
    time: Date;
    rating: string;
    author: string;
    text: string;
    id: string;

    constructor(data: ReviewForResponse) {
        this.time = data.time;
        this.rating = data.rating;
        this.author = data.author;
        this.text = data.text;
        this.id = data.id;
    }
}

export class OrderInfo {
    columnName: string;
    desk: boolean;

    constructor(data: OrderInfo) {
        this.columnName = data.columnName;
        this.desk = data.desk;
    }
}

export class PublicationsResponse {
    imagesUrl: string[];
    note: string;
    id: string;

    constructor(data: PublicationsResponse) {
        this.imagesUrl = data.imagesUrl;
        this.note = data.note;
        this.id = data.id;
    }
}

export class GeneratedResponse {
    response: string;
    review: string;
    id: string;

    constructor(data: GeneratedResponse) {
        this.response = data.response;
        this.review = data.review;
        this.id = data.id;
    }
}

export class AddressObject {
    /**
     * Текстовое представление адреса
     */
    value: string;
    /**
     * Внутрисистемный идентификатор
     */
    id: string;

    constructor(data: AddressObject) {
        this.value = data.value;
        this.id = data.id;
    }
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
}

export class BusinessAiControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /ai/generateReviews
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.generateReviews
     */
    generateReviews(arg0: ReviewForResponse[]): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`ai/generateReviews`, data: arg0 });
    }

    /**
     * HTTP GET /ai/images/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getImage
     */
    getImage(id: string): RestResponse<number[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/images/${id}` });
    }

    /**
     * HTTP GET /ai/publications
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getPublications
     */
    getPublications(queryParams?: { paginator?: PaginationQuery; }): RestResponse<PublicationsResponse[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/publications`, queryParams: queryParams });
    }

    /**
     * HTTP PUT /ai/publications/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.acceptPublication
     */
    acceptPublication(id: string): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`ai/publications/${id}` });
    }

    /**
     * HTTP GET /ai/takeResponses
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.takeResponses
     */
    takeResponses(): RestResponse<GeneratedResponse[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/takeResponses` });
    }
}

export class CommonDataControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /business-common/getAddresses
     * Java method: ru.pashutin.business_ai.controller.CommonDataController.getAddressesFor
     */
    getAddressesFor(queryParams: { addressPart: string; }): RestResponse<AddressObjectList> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/getAddresses`, queryParams: queryParams });
    }
}

export type RestResponse<R> = Promise<R>;

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
