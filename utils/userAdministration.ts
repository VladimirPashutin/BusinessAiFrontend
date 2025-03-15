/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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

/**
 * Процедура регистрации будет завершена только после подтверждения почтового адреса или телефона
 */
export class RegistrationRequest extends FIO {
    /**
     * Приложение, задаётся программно
     */
    application: string;
    /**
     * Строка авторизации
     */
    credentials: string;
    /**
     * Наименование организации
     */
    organization: string;
    /**
     * День рождения
     */
    birthday: Date;
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
        this.application = data.application;
        this.credentials = data.credentials;
        this.organization = data.organization;
        this.birthday = data.birthday;
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
    OKATO: string;
    OKOPF: string;
    OKONH: string;
    OGRN: string;
    OKPO: string;
    OKFS: string;
    INN: string;
    uuid: string;

    constructor(data: Organization) {
        this.strictOrgName = data.strictOrgName;
        this.fullOrganizationName = data.fullOrganizationName;
        this.lowAddress = data.lowAddress;
        this.postAddress = data.postAddress;
        this.department = data.department;
        this.governance = data.governance;
        this.OKATO = data.OKATO;
        this.OKOPF = data.OKOPF;
        this.OKONH = data.OKONH;
        this.OGRN = data.OGRN;
        this.OKPO = data.OKPO;
        this.OKFS = data.OKFS;
        this.INN = data.INN;
        this.uuid = data.uuid;
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
    organizationId: any;
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
    director: string[];
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
        this.director = data.director;
        this.kind = data.kind;
        this.start = data.start;
        this.end = data.end;
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
    id: any;
    organizationId: string;

    constructor(data: OrganizationRef) {
        this.value = data.value;
        this.id = data.id;
        this.organizationId = data.organizationId;
    }
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
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

export class AuthRegistrationControllerClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP POST /auth-registration/accept/{acceptId}
     * Java method: ru.pashutin.auth.controller.AuthRegistrationController.acceptRegistration
     */
    acceptRegistration(acceptId: string): RestResponse<boolean> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`auth-registration/accept/${acceptId}` });
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

export type RestResponse<R> = Promise<R>;

export type AuthType = "BEARER" | "ESIA_TOKEN" | "REFRESH";

export type GoverningKind = "Директор" | "Совет директоров" | "Внешний управляющий" | "Генеральный директор" | "Управляющая компания";

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
