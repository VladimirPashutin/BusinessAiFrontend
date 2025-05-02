import {encode} from "js-base64";
import {Md5} from "ts-md5";

export const makeCredentialsByForm = (form) => {
    return encode(form.login.value + "::" + Md5.hashStr(form.password.value));
}

export const makeCredentialsFromData = (login: string, password: string): string => {
    return encode(login + "::" + Md5.hashStr(password));
}

export class LoginData {
    credentials: string;
    login: string;
    constructor(form) {
        this.credentials = makeCredentials(form);
        this.login = form.login.value;
    }
}
