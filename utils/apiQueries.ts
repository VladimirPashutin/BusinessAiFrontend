/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

export class RefreshRequest {
    refreshToken: string;
    accessToken: string;

    constructor(data: RefreshRequest) {
        this.refreshToken = data.refreshToken;
        this.accessToken = data.accessToken;
    }
}

export class LoginResponse {
    refreshToken: string;
    accessToken: string;

    constructor(data: LoginResponse) {
        this.refreshToken = data.refreshToken;
        this.accessToken = data.accessToken;
    }
}

/**
 * В зависимости от типа авторизация может быть по логину/паролю или по токенам внешних систем авторизации
 */
export class LoginRequest {
    /**
     * Дополнительные параметры, передаваемые с каждым запросом
     */
    params: { [index: string]: any };
    /**
     * Приложение, задаётся программно
     */
    application: string;
    /**
     * Данные для авторизации
     */
    credentials: string;
    /**
     * Тип авторизации, сейчас реализованы по логину/паролю, планируется по токену ЕСИА
     */
    authType: AuthType;

    constructor(data: LoginRequest) {
        this.params = data.params;
        this.application = data.application;
        this.credentials = data.credentials;
        this.authType = data.authType;
    }
}

/**
 * Структура данных для обновления пароля пользователя
 */
export class ChangePassword {
    /**
     * hash нового пароля
     */
    passwordHash: string;
    /**
     * Идентификатор записи для изменения пароля
     */
    id: string;

    constructor(data: ChangePassword) {
        this.passwordHash = data.passwordHash;
        this.id = data.id;
    }
}

export class FIO {
    /**
     * Отчество
     */
    patronymic: string;
    /**
     * Фамилия
     */
    surname: string;
    /**
     * Имя
     */
    name: string;

    constructor(data: FIO) {
        this.patronymic = data.patronymic;
        this.surname = data.surname;
        this.name = data.name;
    }
}

/**
 * Процедура регистрации будет завершена только после подтверждения почтового адреса или телефона
 */
export class RegistrationRequest extends FIO {
    /**
     * Наименование организации
     */
    organization: string;
    /**
     * Приложение, задаётся программно
     */
    application: string;
    /**
     * Строка авторизации
     */
    credentials: string;
    /**
     * Тип авторизации, сейчас реализованы по логину/паролю, планируется по токену ЕСИА
     */
    authType: AuthType;
    /**
     * Мобильный телефон
     */
    phone: string;
    /**
     * Электронный почтовый адрес
     */
    email: string;
    login: string;

    constructor(data: RegistrationRequest) {
        super(data);
        this.organization = data.organization;
        this.application = data.application;
        this.credentials = data.credentials;
        this.authType = data.authType;
        this.phone = data.phone;
        this.email = data.email;
        this.login = data.login;
    }
}

export class RestorePassword {
    /**
     * Приложение, в котором изменяется пароль
     */
    applicationName: string;
    /**
     * Login (почтовый адрес или локальный псевдоним)
     */
    login: string;

    constructor(data: RestorePassword) {
        this.applicationName = data.applicationName;
        this.login = data.login;
    }
}

export class RegistrationInfo extends FIO {
    organization: Organization;
    /**
     * День рождения
     */
    birthday: Date;
    /**
     * Мобильный телефон
     */
    phone: string;
    /**
     * Электронный почтовый адрес
     */
    email: string;

    constructor(data: RegistrationInfo) {
        super(data);
        this.organization = data.organization;
        this.birthday = data.birthday;
        this.phone = data.phone;
        this.email = data.email;
    }
}

export class Prompt {
    providerType: AiProviderType;
    kind: PromptKind;
    content: string;
    id: string;

    constructor(data: Prompt) {
        this.providerType = data.providerType;
        this.kind = data.kind;
        this.content = data.content;
        this.id = data.id;
    }
}

export class PublicationStrategy {
    assortments: Assortment[];
    cronExpression: string;
    prompt: Prompt;
    name: string;

    constructor(data: PublicationStrategy) {
        this.assortments = data.assortments;
        this.cronExpression = data.cronExpression;
        this.prompt = data.prompt;
        this.name = data.name;
    }
}

export class Assortment {
    /**
     * Детальное описание
     */
    description: string;
    /**
     * Ссылки для получения изображений (фотографии продукта)
     */
    images: string[];
    /**
     * Специальные свойства
     */
    goodsProperty: GoodsProperty[];
    /**
     * Единица измерения
     */
    measurement: string;
    /**
     * Зарегистрированная торговая марка
     */
    trademark: string;
    /**
     * Артикул
     */
    article: string;
    /**
     * Штрих-код EAN-13
     */
    barcode: string;
    /**
     * Код по общероссийскому классификатору продукции
     */
    ok_code: string;
    /**
     * Наименование
     */
    name: string;
    /**
     * Внутрисистемный идентификатор
     */
    id: string;

    constructor(data: Assortment) {
        this.description = data.description;
        this.images = data.images;
        this.goodsProperty = data.goodsProperty;
        this.measurement = data.measurement;
        this.trademark = data.trademark;
        this.article = data.article;
        this.barcode = data.barcode;
        this.ok_code = data.ok_code;
        this.name = data.name;
        this.id = data.id;
    }
}

export class Organization {
    /**
     * Сокращённое наименование
     */
    strictOrgName: string;
    /**
     * Полное официальное наименование
     */
    fullOrganizationName: string;
    /**
     * Юридический адрес
     */
    lowAddress: AddressObject;
    /**
     * Почтовый адрес
     */
    postAddress: AddressObject;
    /**
     * Подразделения организации
     */
    department: Department[];
    governance: Governance;
    bankDetails: BankingDetails[];
    contacts: ContactInfo[];
    okato: string;
    okopf: string;
    okved: string;
    ogrn: string;
    okpo: string;
    okfs: string;
    inn: string;
    /**
     * Уникальный идентификатор
     */
    id: string;

    constructor(data: Organization) {
        this.strictOrgName = data.strictOrgName;
        this.fullOrganizationName = data.fullOrganizationName;
        this.lowAddress = data.lowAddress;
        this.postAddress = data.postAddress;
        this.department = data.department;
        this.governance = data.governance;
        this.bankDetails = data.bankDetails;
        this.contacts = data.contacts;
        this.okato = data.okato;
        this.okopf = data.okopf;
        this.okved = data.okved;
        this.ogrn = data.ogrn;
        this.okpo = data.okpo;
        this.okfs = data.okfs;
        this.inn = data.inn;
        this.id = data.id;
    }
}

export class GoodsCatalog {
    /**
     * Владелец каталога
     */
    owner: OrganizationRef;
    /**
     * Описание каталога
     */
    description: string;
    /**
     * Конкретные позиции по каталогу
     */
    catalogPosition: CatalogPosition[];
    /**
     * Идентификатор классификатора, на основании которого составлен каталог
     */
    classifierId: string;
    /**
     * Наименование каталога
     */
    name: string;
    /**
     * Уникальный идентификатор каталога
     */
    id: string;

    constructor(data: GoodsCatalog) {
        this.owner = data.owner;
        this.description = data.description;
        this.catalogPosition = data.catalogPosition;
        this.classifierId = data.classifierId;
        this.name = data.name;
        this.id = data.id;
    }
}

export class PublicationsResponse {
    platformInfos: PublicationPlatformInfo[];
    readyState: PublicationState;
    images: string[];
    assortmentId: string;
    title: string;
    note: string;
    id: string;

    constructor(data: PublicationsResponse) {
        this.platformInfos = data.platformInfos;
        this.readyState = data.readyState;
        this.images = data.images;
        this.assortmentId = data.assortmentId;
        this.title = data.title;
        this.note = data.note;
        this.id = data.id;
    }
}

export class GeneratedResponse {
    createdAt: Date;
    state: RequestState;
    response: string;
    platform: string;
    review: string;
    client: string;
    rate: number;
    id: string;

    constructor(data: GeneratedResponse) {
        this.createdAt = data.createdAt;
        this.state = data.state;
        this.response = data.response;
        this.platform = data.platform;
        this.review = data.review;
        this.client = data.client;
        this.rate = data.rate;
        this.id = data.id;
    }
}

export class Property {
    valueKind: ValueKind;
    value: any;
    name: string;

    constructor(data: Property) {
        this.valueKind = data.valueKind;
        this.value = data.value;
        this.name = data.name;
    }
}

export class GoodsProperty extends Property {
    /**
     * Вид свойства для специальных обработок
     */
    kind: GoodsPropertyKind;
    /**
     * Идентификатор свойства
     */
    id: string;

    constructor(data: GoodsProperty) {
        super(data);
        this.kind = data.kind;
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

export class Department {
    /**
     * Местоположение (адрес или относительное описание
     */
    place: string;
    /**
     * Идентификатор организации
     */
    organizationId: string;
    /**
     * Наименование структурного подразделения
     */
    name: string;

    constructor(data: Department) {
        this.place = data.place;
        this.organizationId = data.organizationId;
        this.name = data.name;
    }
}

export class Governance {
    /**
     * Управляющая организация
     */
    organization: OrganizationRef;
    /**
     * Список идентификаторов совета директоров
     */
    directorIdList: string[];
    /**
     * Вид управляющего органа
     */
    kind: GoverningKind;
    /**
     * Начало осуществления руководства
     */
    start: Date;
    /**
     * Окончание руководства
     */
    end: Date;

    constructor(data: Governance) {
        this.organization = data.organization;
        this.directorIdList = data.directorIdList;
        this.kind = data.kind;
        this.start = data.start;
        this.end = data.end;
    }
}

export class BankingDetails {
    /**
     * Корреспондентский счёт
     */
    correspond: string;
    /**
     * Банк
     */
    bankName: string;
    /**
     * Расчётный счёт
     */
    account: string;
    /**
     * Идентификатор владельца счёта
     */
    ownerId: string;
    /**
     * Наименование счёта
     */
    name: string;
    /**
     * БИК
     */
    bik: string;
    /**
     * ИНН
     */
    inn: string;
    /**
     * КПП
     */
    kpp: string;

    constructor(data: BankingDetails) {
        this.correspond = data.correspond;
        this.bankName = data.bankName;
        this.account = data.account;
        this.ownerId = data.ownerId;
        this.name = data.name;
        this.bik = data.bik;
        this.inn = data.inn;
        this.kpp = data.kpp;
    }
}

export class ContactInfo {
    /**
     * Текстовое представление
     */
    value: string;
    /**
     * Вид контактных данных
     */
    kind: string;

    constructor(data: ContactInfo) {
        this.value = data.value;
        this.kind = data.kind;
    }
}

export class OrganizationRef {
    /**
     * Наименование организации
     */
    value: string;
    /**
     * Идентификатор организации
     */
    id: string;

    constructor(data: OrganizationRef) {
        this.value = data.value;
        this.id = data.id;
    }
}

export class CatalogPosition extends Assortment {
    /**
     * Производитель
     */
    manufacturer: OrganizationRef;
    /**
     * Группы классификации к которым относится данная товарная позиция
     */
    groupId: string[];
    /**
     * Состав данной позиции
     */
    part: Assortment[];
    /**
     * Ценовые предложения
     */
    price: Price[];
    /**
     * Идентификатор каталога
     */
    catalogId: string;

    constructor(data: CatalogPosition) {
        super(data);
        this.manufacturer = data.manufacturer;
        this.groupId = data.groupId;
        this.part = data.part;
        this.price = data.price;
        this.catalogId = data.catalogId;
    }
}

export class PublicationPlatformInfo {
    publicatedAt: Date;
    platform: string;

    constructor(data: PublicationPlatformInfo) {
        this.publicatedAt = data.publicatedAt;
        this.platform = data.platform;
    }
}

export class Price {
    /**
     * Дополнительные свойства
     */
    goodsProperty: GoodsProperty[];
    /**
     * Учтённые налоги
     */
    tax: Tax[];
    /**
     * Значение цены
     */
    value: number;
    /**
     * Валюта
     */
    currency: string;
    /**
     * Вид цены
     */
    kind: PriceKind;
    /**
     * Наименование цены
     */
    name: string;
    /**
     * Идентификатор цены
     */
    id: string;

    constructor(data: Price) {
        this.goodsProperty = data.goodsProperty;
        this.tax = data.tax;
        this.value = data.value;
        this.currency = data.currency;
        this.kind = data.kind;
        this.name = data.name;
        this.id = data.id;
    }
}

export class Tax {
    value: number;
    insideTotal: boolean;
    isAbsolute: boolean;
    isExcise: boolean;
    name: string;

    constructor(data: Tax) {
        this.value = data.value;
        this.insideTotal = data.insideTotal;
        this.isAbsolute = data.isAbsolute;
        this.isExcise = data.isExcise;
        this.name = data.name;
    }
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
}

export class AuthenticationControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /auth/isLoginExists
     * Java method: ru.pashutin.auth.controller.AuthenticationController.isLoginExists
     */
    isLoginExists(queryParams: { application: string; login: string; }): RestResponse<boolean> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`auth/isLoginExists`, queryParams: queryParams });
    }

    /**
     * HTTP POST /auth/login
     * Java method: ru.pashutin.auth.controller.AuthenticationController.login
     */
    login(arg1: LoginRequest): RestResponse<LoginResponse> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth/login`, data: arg1 });
    }

    /**
     * HTTP POST /auth/refresh
     * Java method: ru.pashutin.auth.controller.AuthenticationController.getNewRefreshToken
     */
    getNewRefreshToken(arg0: RefreshRequest): RestResponse<LoginResponse> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth/refresh`, data: arg0 });
    }

    /**
     * HTTP POST /auth/token
     * Java method: ru.pashutin.auth.controller.AuthenticationController.getNewAccessToken
     */
    getNewAccessToken(arg0: string): RestResponse<string> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth/token`, data: arg0 });
    }
}

export class BusinessCommonControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /business-common/assortment/images/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getAssortmentImages
     */
    getAssortmentImages(id: string): RestResponse<string[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/assortment/images/${id}` });
    }

    /**
     * HTTP DELETE /business-common/assortment/images/{id}/{name}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.deleteAssortmentImage
     */
    deleteAssortmentImage(id: string, name: string): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`business-common/assortment/images/${id}/${name}` });
    }

    /**
     * HTTP POST /business-common/assortment/images/{id}/{name}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.saveAssortmentImage
     */
    saveAssortmentImage(id: string, name: string, queryParams: { file: any; }): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`business-common/assortment/images/${id}/${name}`, queryParams: queryParams });
    }

    /**
     * HTTP GET /business-common/assortment/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getAssortment
     */
    getAssortment(id: string): RestResponse<Assortment> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/assortment/${id}` });
    }

    /**
     * HTTP DELETE /business-common/assortments/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.deleteAssortment
     */
    deleteAssortment(id: string): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`business-common/assortments/${id}` });
    }

    /**
     * HTTP GET /business-common/assortments/{orgId}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getAssortmentList
     */
    getAssortmentList(orgId: string): RestResponse<Assortment[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/assortments/${orgId}` });
    }

    /**
     * HTTP POST /business-common/assortments/{orgId}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.saveAssortment
     */
    saveAssortment(orgId: string, arg1: Assortment): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`business-common/assortments/${orgId}`, data: arg1 });
    }

    /**
     * HTTP GET /business-common/images/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getImage
     */
    getImage(id: string): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/images/${id}` });
    }

    /**
     * HTTP GET /business-common/organization/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getOrganizationById
     */
    getOrganizationById(id: string): RestResponse<Organization> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/organization/${id}` });
    }

    /**
     * HTTP GET /business-common/organizationByName/{name}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.getOrganizationByName
     */
    getOrganizationByName(name: string): RestResponse<Organization> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`business-common/organizationByName/${name}` });
    }

    /**
     * HTTP POST /business-common/organizations
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.saveOrganization
     */
    saveOrganization(arg0: Organization): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`business-common/organizations`, data: arg0 });
    }

    /**
     * HTTP POST /business-common/organizations/{orgId}
     * Java method: ru.pashutin.business_ai.controller.BusinessCommonController.saveAssortmentsFromExcel
     */
    saveAssortmentsFromExcel(orgId: string, queryParams: { file: any; }): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`business-common/organizations/${orgId}`, queryParams: queryParams });
    }
}

export class BusinessAiControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /ai/approvePublication/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.approvePublication
     */
    approvePublication(id: string): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`ai/approvePublication/${id}` });
    }

    /**
     * HTTP POST /ai/approveResponse
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.approveResponse
     */
    approveResponse(queryParams: { id: string; platform: string; }): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`ai/approveResponse`, queryParams: queryParams });
    }

    /**
     * HTTP GET /ai/count-of-publications
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getAllPublicationsCount
     */
    getAllPublicationsCount(): RestResponse<number> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/count-of-publications` });
    }

    /**
     * HTTP GET /ai/count-of-responses
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getAllResponsesCount
     */
    getAllResponsesCount(): RestResponse<number> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/count-of-responses` });
    }

    /**
     * HTTP POST /ai/prompt
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.savePrompt
     */
    savePrompt(arg0: Prompt): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`ai/prompt`, data: arg0 });
    }

    /**
     * HTTP GET /ai/prompt/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getPrompt
     */
    getPrompt(id: string): RestResponse<Prompt> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/prompt/${id}` });
    }

    /**
     * HTTP GET /ai/prompts/{orgName}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getPrompts
     */
    getPrompts(orgName: string): RestResponse<Prompt[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/prompts/${orgName}` });
    }

    /**
     * HTTP POST /ai/publication-plan
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.savePublicationPlan
     */
    savePublicationPlan(arg0: PublicationStrategy): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`ai/publication-plan`, data: arg0 });
    }

    /**
     * HTTP GET /ai/publication-plans/{orgName}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getPublicationPlans
     */
    getPublicationPlans(orgName: string): RestResponse<PublicationStrategy[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/publication-plans/${orgName}` });
    }

    /**
     * HTTP GET /ai/publications
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getAllPublications
     */
    getAllPublications(queryParams: { offset: number; limit: number; }): RestResponse<PublicationsResponse[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/publications`, queryParams: queryParams });
    }

    /**
     * HTTP DELETE /ai/rejectPublication/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.rejectPublication
     */
    rejectPublication(id: string): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`ai/rejectPublication/${id}` });
    }

    /**
     * HTTP DELETE /ai/rejectResponse
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.rejectResponse
     */
    rejectResponse(queryParams: { id: string; platform: string; }): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`ai/rejectResponse`, queryParams: queryParams });
    }

    /**
     * HTTP GET /ai/responses
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getAllResponses
     */
    getAllResponses(queryParams: { offset: number; limit: number; }): RestResponse<GeneratedResponse[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`ai/responses`, queryParams: queryParams });
    }
}

export class AuthRegistrationControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /auth-registration/accept/{acceptId}
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.acceptRegistration
     */
    acceptRegistration(acceptId: string): RestResponse<boolean> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`auth-registration/accept/${acceptId}` });
    }

    /**
     * HTTP POST /auth-registration/changePassword
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.changePassword
     */
    changePassword(arg0: ChangePassword): RestResponse<boolean> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth-registration/changePassword`, data: arg0 });
    }

    /**
     * HTTP GET /auth-registration/generateKey
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.generateKey
     */
    generateKey(): RestResponse<string> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`auth-registration/generateKey` });
    }

    /**
     * HTTP POST /auth-registration/registration
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.registration
     */
    registration(arg1: RegistrationRequest): RestResponse<string> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth-registration/registration`, data: arg1 });
    }

    /**
     * HTTP POST /auth-registration/restorePassword
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.restorePassword
     */
    restorePassword(arg1: RestorePassword): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth-registration/restorePassword`, data: arg1 });
    }
}

export class AuthAdministrationControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /auth-admin/registrationInfo
     * Java method: ru.pashutin.auth.controller.AuthAdministrationController.getRegistrationInfo
     */
    getRegistrationInfo(): RestResponse<RegistrationInfo> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`auth-admin/registrationInfo` });
    }

    /**
     * HTTP POST /auth-admin/updateRegistrationInfo
     * Java method: ru.pashutin.auth.controller.AuthAdministrationController.setRegistrationInfo
     */
    setRegistrationInfo(arg0: RegistrationInfo): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth-admin/updateRegistrationInfo`, data: arg0 });
    }
}

export class CommonDataControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /common/catalog/{id}
     * Java method: ru.pashutin.business_ai.controller.CommonDataController.getCatalog
     */
    getCatalog(id: string): RestResponse<GoodsCatalog> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`common/catalog/${id}` });
    }
}

export type RestResponse<R> = Promise<R>;

export type AuthType = "BEARER" | "ESIA_TOKEN" | "REFRESH";

export type AiProviderType = "MISTRAL";

export type PromptKind = "IMAGE_DESCRIPTION" | "PUBLICATION" | "RESPONSE" | "CHECK";

export type PublicationState = "PREPARED" | "READY";

export type RequestState = "CREATED" | "PROCESSED" | "READY" | "REJECTED" | "POSTED";

export type ValueKind = "BOOLEAN" | "DATE" | "TIME" | "FLOAT" | "GUID" | "IMAGE" | "LONG" | "STRING" | "CUSTOM_OBJECT";

export type GoodsPropertyKind = "Реквизит 1С" | "Характеристика 1С";

export type GoverningKind = "Директор" | "Совет директоров" | "Внешний управляющий" | "Генеральный директор" | "Управляющая компания" | "Индивидуальный предприниматель";

export type PriceKind = "Специальная" | "МинПродажная" | "Себестоимость" | "Розничная" | "Оптовая";

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
