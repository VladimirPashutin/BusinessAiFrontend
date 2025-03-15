"use strict";
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonDataControllerClient = exports.BusinessAiControllerClient = exports.AddressObject = exports.GeneratedResponse = exports.PublicationsResponse = exports.OrderInfo = exports.ReviewForResponse = exports.AddressObjectList = exports.PaginationQuery = void 0;
var PaginationQuery = /** @class */ (function () {
    function PaginationQuery(data) {
        this.order = data.order;
        this.offset = data.offset;
        this.limit = data.limit;
    }
    return PaginationQuery;
}());
exports.PaginationQuery = PaginationQuery;
/**
 * Тип для списка адресуемых объектов
 */
var AddressObjectList = /** @class */ (function () {
    function AddressObjectList(data) {
        this.addressObject = data.addressObject;
    }
    return AddressObjectList;
}());
exports.AddressObjectList = AddressObjectList;
var ReviewForResponse = /** @class */ (function () {
    function ReviewForResponse(data) {
        this.time = data.time;
        this.rating = data.rating;
        this.author = data.author;
        this.text = data.text;
        this.id = data.id;
    }
    return ReviewForResponse;
}());
exports.ReviewForResponse = ReviewForResponse;
var OrderInfo = /** @class */ (function () {
    function OrderInfo(data) {
        this.columnName = data.columnName;
        this.desk = data.desk;
    }
    return OrderInfo;
}());
exports.OrderInfo = OrderInfo;
var PublicationsResponse = /** @class */ (function () {
    function PublicationsResponse(data) {
        this.imagesUrl = data.imagesUrl;
        this.note = data.note;
        this.id = data.id;
    }
    return PublicationsResponse;
}());
exports.PublicationsResponse = PublicationsResponse;
var GeneratedResponse = /** @class */ (function () {
    function GeneratedResponse(data) {
        this.response = data.response;
        this.review = data.review;
        this.id = data.id;
    }
    return GeneratedResponse;
}());
exports.GeneratedResponse = GeneratedResponse;
var AddressObject = /** @class */ (function () {
    function AddressObject(data) {
        this.value = data.value;
        this.id = data.id;
    }
    return AddressObject;
}());
exports.AddressObject = AddressObject;
var BusinessAiControllerClient = /** @class */ (function () {
    function BusinessAiControllerClient(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * HTTP POST /ai/generateReviews
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.generateReviews
     */
    BusinessAiControllerClient.prototype.generateReviews = function (arg0) {
        return this.httpClient.request({ method: "POST", url: uriEncoding(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ai/generateReviews"], ["ai/generateReviews"]))), data: arg0 });
    };
    /**
     * HTTP GET /ai/images/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getImage
     */
    BusinessAiControllerClient.prototype.getImage = function (id) {
        return this.httpClient.request({ method: "GET", url: uriEncoding(templateObject_2 || (templateObject_2 = __makeTemplateObject(["ai/images/", ""], ["ai/images/", ""])), id) });
    };
    /**
     * HTTP GET /ai/publications
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.getPublications
     */
    BusinessAiControllerClient.prototype.getPublications = function (queryParams) {
        return this.httpClient.request({ method: "GET", url: uriEncoding(templateObject_3 || (templateObject_3 = __makeTemplateObject(["ai/publications"], ["ai/publications"]))), queryParams: queryParams });
    };
    /**
     * HTTP PUT /ai/publications/{id}
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.acceptPublication
     */
    BusinessAiControllerClient.prototype.acceptPublication = function (id) {
        return this.httpClient.request({ method: "PUT", url: uriEncoding(templateObject_4 || (templateObject_4 = __makeTemplateObject(["ai/publications/", ""], ["ai/publications/", ""])), id) });
    };
    /**
     * HTTP GET /ai/takeResponses
     * Java method: ru.pashutin.business_ai.controller.BusinessAiController.takeResponses
     */
    BusinessAiControllerClient.prototype.takeResponses = function () {
        return this.httpClient.request({ method: "GET", url: uriEncoding(templateObject_5 || (templateObject_5 = __makeTemplateObject(["ai/takeResponses"], ["ai/takeResponses"]))) });
    };
    return BusinessAiControllerClient;
}());
exports.BusinessAiControllerClient = BusinessAiControllerClient;
var CommonDataControllerClient = /** @class */ (function () {
    function CommonDataControllerClient(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * HTTP GET /business-common/getAddresses
     * Java method: ru.pashutin.business_ai.controller.CommonDataController.getAddressesFor
     */
    CommonDataControllerClient.prototype.getAddressesFor = function (queryParams) {
        return this.httpClient.request({ method: "GET", url: uriEncoding(templateObject_6 || (templateObject_6 = __makeTemplateObject(["business-common/getAddresses"], ["business-common/getAddresses"]))), queryParams: queryParams });
    };
    return CommonDataControllerClient;
}());
exports.CommonDataControllerClient = CommonDataControllerClient;
function uriEncoding(template) {
    var substitutions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        substitutions[_i - 1] = arguments[_i];
    }
    var result = "";
    for (var i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
