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
var LevantamientoService = (function () {
    function LevantamientoService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
    }
    /**
     * Get all the requirements
     */
    LevantamientoService.prototype.getAll = function () {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/Sent').map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj); //borrar
    };
    /**
     *  Check all the parameters of a requirements
     * @param id The identification of the request
     */
    LevantamientoService.prototype.getByID = function (id) {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj[0]);
    };
    /**
     * Delete a requirements by their identification
     * @param id The identification of the inclusion
     */
    LevantamientoService.prototype.deleteByID = function (id) {
        console.log(' Delete the levantamiento  ' + id);
    };
    LevantamientoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], LevantamientoService);
    return LevantamientoService;
}());
exports.LevantamientoService = LevantamientoService;
//# sourceMappingURL=levantamiento.service.js.map