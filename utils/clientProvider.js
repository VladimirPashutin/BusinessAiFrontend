"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareHeaders = exports.prepareUserAdminUrl = exports.prepareApiUrl = void 0;
var loginStore_ts_1 = require("../stores/loginStore.ts");
var prepareApiUrl = function (url, queryParams) {
    var runtimeConfig = useRuntimeConfig();
    var result = runtimeConfig.app.businessApiUrl + url;
    if (queryParams === null || queryParams === undefined) {
        return result;
    }
    var params = new URLSearchParams(queryParams);
    return result + '?' + params.toString();
};
exports.prepareApiUrl = prepareApiUrl;
var prepareUserAdminUrl = function (url, queryParams) {
    var runtimeConfig = useRuntimeConfig();
    var result = runtimeConfig.app.userAdminUrl + url;
    if (queryParams === null || queryParams === undefined) {
        return result;
    }
    var params = new URLSearchParams(queryParams);
    return result + '?' + params.toString();
};
exports.prepareUserAdminUrl = prepareUserAdminUrl;
var prepareHeaders = function () {
    var result = new Headers();
    var loginStore = (0, loginStore_ts_1.useLoginStore)();
    result.append("Authorization", loginStore.accessToken);
    result.append("Content-Type", "application/json");
    return result;
};
exports.prepareHeaders = prepareHeaders;
