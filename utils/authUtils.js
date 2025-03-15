"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationData = exports.LoginData = void 0;
exports.getUserInfo = getUserInfo;
exports.isActive = isActive;
var jwt_decode_1 = require("jwt-decode");
var js_base64_1 = require("js-base64");
var ts_md5_1 = require("ts-md5");
var LoginData = /** @class */ (function () {
    function LoginData(form) {
        this.password = form.password.value;
        this.login = form.login.value;
    }
    return LoginData;
}());
exports.LoginData = LoginData;
var RegistrationData = /** @class */ (function () {
    function RegistrationData(form) {
        var _a;
        this.authType = 'BEARER';
        this.email = form.eMail.value;
        this.phone = form.phone.value;
        this.application = 'business-ai';
        this.name = form.personName.value;
        this.surname = form.surname.value;
        this.birthday = (_a = form.birthday) === null || _a === void 0 ? void 0 : _a.value;
        this.patronymic = form.patronymic.value;
        this.credentials = (0, js_base64_1.encode)(form.login.value + "::" + ts_md5_1.Md5.hashStr(form.password.value));
    }
    return RegistrationData;
}());
exports.RegistrationData = RegistrationData;
function getUserInfo(token) {
    if (token === null || token === undefined) {
        return null;
    }
    var result = new UserInfo();
    var jwt = (0, jwt_decode_1.jwtDecode)(token);
    result.communities = jwt['communities'];
    result.application = 'business-ai';
    result.name = jwt['userName'];
    result.roles = jwt['roles'];
    return result;
}
function isActive(token) {
    if (token === null || token === undefined) {
        return false;
    }
    try {
        var jwt = (0, jwt_decode_1.jwtDecode)(token);
        return jwt.exp > (new Date().getTime()) / 1000;
    }
    catch (e) {
        console.error(e);
    }
    return false;
}
