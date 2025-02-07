import {jwtDecode} from "jwt-decode"
import {encode} from "js-base64";
import {Md5} from "ts-md5";

export class UserInfo {
    communities: string[] | undefined;
    application: string | undefined;
    roles: string[] | undefined;
    name: string | undefined;
}

export class LoginData {
    password: string;
    login: string;
    constructor(form) {
        this.password = form.password.value;
        this.login = form.login.value;
    }
}

export class RegistrationData {
    application: string;
    credentials: string;
    patronymic: string;
    authType: string;
    surname: string;
    birthday: Date;
    name: string;
    email: string;
    phone: string;
    constructor(form) {
        this.authType = 'BEARER';
        this.email = form.eMail.value;
        this.phone = form.phone.value;
        this.application = 'business-ai';
        this.name = form.personName.value;
        this.surname = form.surname.value;
        this.birthday = form.birthday?.value;
        this.patronymic = form.patronymic.value;
        this.credentials = encode(form.login.value + "::" + Md5.hashStr(form.password.value));
    }
}

export function getUserInfo(token: string): UserInfo {
    if(token === null || token === undefined) { return null; }
    const result = new UserInfo();
    const jwt = jwtDecode(token);
    result.communities = jwt['communities'];
    result.application = 'business-ai';
    result.name = jwt['userName'];
    result.roles = jwt['roles'];
    return result;
}

export function isActive(token: string): boolean {
    if(token === null || token === undefined) { return false; }
    try { const jwt = jwtDecode(token);
        return jwt.exp > (new Date().getTime()) / 1000;
    } catch(e) { console.error(e); }
    return false;
}