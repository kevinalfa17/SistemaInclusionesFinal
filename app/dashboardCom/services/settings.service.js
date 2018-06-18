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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require("rxjs/add/observable/of"); //borrar
var server_service_1 = require('../../shared/server.service');
var SettingsService = (function () {
    function SettingsService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
        //borrar
        this.obj = [
            {
                "fecha_inicial": "01/01/2018 10:00 AM", "fecha_intermedio": "01/02/2018 10:00 AM",
                "fecha_final": "01/03/2018 10:00 AM"
            },
        ];
        //borrar
        this.obj2 = [
            { "id": "1", "descripcion": "Recibido" }, { "id": "2", "descripcion": "En evaluacion" },
            { "id": "3", "descripcion": "Evaluado" }, { "id": "4", "descripcion": "Pendiente de notificarse" },
            { "id": "5", "descripcion": "Aprobado" }, { "id": "6", "descripcion": "Requiere valoracion de consejo" }
        ];
        //borrar
        this.obj3 = [
            { "anno": "1", "semestre": "4" },
            { "anno": "5", "semestre": "2" }
        ];
    }
    /**
     *  Check all the paramters of the current configuration
     * @param code The identification of the inclusion
     */
    SettingsService.prototype.getCurrentSettings = function () {
        return this._http.get(this._Server.direction + 'ce/Config').map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj); //borrar    
    };
    SettingsService.prototype.changeInitialDate = function (newDate) {
        console.log("VAMOS A LA BASE A PONER DE FECHA INICIAL " + newDate);
    };
    SettingsService.prototype.changeInterDate = function (newDate) {
        console.log("VAMOS A LA BASE A PONER DE FECHA INTERMEDIA " + newDate);
    };
    SettingsService.prototype.changeFinalDate = function (newDate) {
        console.log("VAMOS A LA BASE A PONER DE FECHA FINAL " + newDate);
    };
    /**
     * Return all the possibles status for a service
     */
    SettingsService.prototype.getStatusServices = function () {
        return Observable_1.Observable.of(this.obj2);
    };
    /**
 * Return all the possibles status for a service
 */
    SettingsService.prototype.getCheckEntityServices = function () {
        return Observable_1.Observable.of(this.obj2);
    };
    SettingsService.prototype.getPeriodById = function (id) {
        return this._http.get(this._Server.direction + 'ce/Period/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map