"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var RequestService = (function () {
    function RequestService(http) {
        this.http = http;
        this.service1 = "http://192.168.0.34/CE-Transaction";
        this.service2 = "http://192.168.0.34/CE-Authentication";
    }
    //Transaction service
    RequestService.prototype.getConfig = function () {
        return this.http.get(this.service1 + '/ce/Config').map(function (res) { return res.json(); });
    };
    RequestService.prototype.sendInclusion = function (request) {
        return this.http.post(this.service1 + '/ce/Inclusions', request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.updateInclusion = function (request, id) {
        console.log("update req" + JSON.stringify(request));
        return this.http.put(this.service1 + '/ce/Inclusions/Student?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.appealInclusion = function (id, request) {
        return this.http.put(this.service1 + '/ce/Inclusions/StudentAppeal?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.sendRequirements = function (request) {
        return this.http.post(this.service1 + '/ce/SkipRequirements', request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.updateRequirements = function (request, id) {
        console.log("update req" + JSON.stringify(request));
        return this.http.put(this.service1 + '/ce/SkipRequirements/Student?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.appealRequirements = function (id, request) {
        return this.http.put(this.service1 + '/ce/SkipRequirements/StudentAppeal?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.sendRn = function (request) {
        return this.http.post(this.service1 + '/ce/SkipRN', request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.updateRn = function (request, id) {
        console.log("update req" + JSON.stringify(request));
        return this.http.put(this.service1 + '/ce/SkipRN/Student?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.appealRn = function (id, request) {
        console.log(this.service1 + '/ce/SkipRN/StudentAppeal?id=' + id);
        console.log(JSON.stringify(request));
        return this.http.put(this.service1 + '/ce/SkipRN/StudentAppeal?id=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getInclusion = function (id) {
        return this.http.get(this.service1 + '/ce/Inclusions/Student?student=' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getRequirements = function (id) {
        console.log("grequirements");
        console.log(this.service1 + '/ce/SkipRequirements/Student?student=' + id);
        return this.http.get(this.service1 + '/ce/SkipRequirements/Student?student=' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getRn = function (id) {
        return this.http.get(this.service1 + '/ce/SkipRN/Student?student=' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getSpecificInclusion = function (id) {
        return this.http.get(this.service1 + '/ce/Inclusions/' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getSpecificRequirement = function (id) {
        return this.http.get(this.service1 + '/ce/SkipRequirements/' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getSpecificRn = function (id) {
        return this.http.get(this.service1 + '/ce/SkipRN/' + id).map(function (res) { return res.json(); });
    };
    RequestService.prototype.deleteInclusion = function (request) {
        return this.http.delete(this.service1 + '/ce/Inclusions/' + request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.deleteRequirements = function (request) {
        return this.http.delete(this.service1 + '/ce/SkipRequirements/' + request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.deleteRn = function (request) {
        return this.http.delete(this.service1 + '/ce/SkipRN/' + request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getCourses = function () {
        return this.http.get(this.service1 + '/ce/Courses').map(function (res) { return res.json(); });
    };
    RequestService.prototype.savePlan = function (request, id) {
        console.log(JSON.stringify(request));
        console.log(this.service1 + '/ce/CoursePlan?student=' + id);
        return this.http.post(this.service1 + '/ce/CoursePlan?student=' + id, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getPlan = function (student) {
        return this.http.get(this.service1 + '/ce/CoursePlan?student=' + student).map(function (res) { return res.json(); });
    };
    RequestService.prototype.getNotifications = function (email) {
        return this.http.get(this.service1 + '/ce/Notification?email=' + email).map(function (res) { return res.json(); });
    };
    //Auth service
    RequestService.prototype.updateProfile = function (request) {
        return this.http.put(this.service2 + '/ce/Students/Student?id=' + request.carne, request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.login = function (request) {
        return this.http.post(this.service2 + '/ce/StudentAuth/Authenticate', request).map(function (res) { return res.json(); });
    };
    RequestService.prototype.generateToken = function (request) {
        return this.http.post(this.service2 + '/ce/StudentAuth/Token', request).map(function (res) { return res.json(); });
    };
    RequestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map