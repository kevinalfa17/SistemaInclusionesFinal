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
require('rxjs/add/operator/catch');
require("rxjs/add/observable/of"); //borrar
var server_service_1 = require('../../shared/server.service');
var AppealsService = (function () {
    function AppealsService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
    }
    AppealsService.prototype.getAllInclu = function () {
        return this._http.get(this._Server.direction + 'ce/Inclusions/Sent').map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    AppealsService.prototype.getAllReq = function () {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/Sent').map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    AppealsService.prototype.getAllReqRN = function () {
        return this._http.get(this._Server.direction + 'ce/SkipRN/Sent').map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     *  Check all the parameters of an inclusion
     * @param id The identification of the inclusion
     * @param tipo El tipo de solicitud
     */
    AppealsService.prototype.getByID = function (id, tipo) {
        var connectionString = "";
        console.log(id, tipo);
        if (tipo == 'Inclusión') {
            connectionString = "Inclusions";
        }
        if (tipo == 'Levantamiento Requisito') {
            connectionString = "SkipRequirements";
        }
        if (tipo == 'Levantamiento Requisito RN') {
            connectionString = "SkipRN";
        }
        return this._http.get(this._Server.direction + 'ce/' + connectionString + '/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     *  Check all the parameters of an inclusion
     * @param id The identification of the inclusion
     * @param tipo The type
     * @param req The object with the json
     */
    AppealsService.prototype.editAppeal = function (id, tipo, req) {
        var connectionString = "";
        console.log(id, tipo);
        if (tipo == 'Inclusión') {
            connectionString = "Inclusions";
        }
        if (tipo == 'Levantamiento Requisito') {
            connectionString = "SkipRequirements";
        }
        if (tipo == 'Levantamiento Requisito RN') {
            connectionString = "SkipRN";
        }
        return this._http.put(this._Server.direction + 'ce/' + connectionString + '//Appeal?id=' + id, req).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     * Delete an inclusion by their identification
     * @param id The identification of the inclusion
     */
    AppealsService.prototype.deleteByID = function (id) {
        console.log(' Delete the inclusion  ' + id);
    };
    AppealsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], AppealsService);
    return AppealsService;
}());
exports.AppealsService = AppealsService;
//# sourceMappingURL=appeals.service.js.map