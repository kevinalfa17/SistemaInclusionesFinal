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
var server_service_1 = require('../../shared/server.service');
var LevantamientoRNService = (function () {
    function LevantamientoRNService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
    }
    /**
     * Get all the requirements RN
     */
    LevantamientoRNService.prototype.getAll = function () {
        return this._http.get(this._Server.direction + 'ce/SkipRN/Sent').map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     *  Check all the parameters of a requirements RN
     * @param id The identification of the request
     */
    LevantamientoRNService.prototype.getByID = function (id) {
        return this._http.get(this._Server.direction + 'ce/SkipRN/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     * Delete a requirements RN by their identification
     * @param id The identification of the inclusion
     */
    LevantamientoRNService.prototype.deleteByID = function (id) {
        console.log(' Delete the levantamiento  ' + id);
    };
    LevantamientoRNService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], LevantamientoRNService);
    return LevantamientoRNService;
}());
exports.LevantamientoRNService = LevantamientoRNService;
//# sourceMappingURL=levantamientoRN.service.js.map