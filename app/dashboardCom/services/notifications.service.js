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
var NotificationsService = (function () {
    function NotificationsService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
        // borrar
        this.obj = [
            { "id": 0, "tipo": "inc", "estudiante": 2015104425, "descripcion": " algun lugar gg", "leido": false, "idService": 0 },
            { "id": 10, "tipo": "req", "estudiante": 2015104425, "descripcion": " algun lugar gg2", "leido": false, "idService": 1 },
            { "id": 55, "tipo": "reqRN", "estudiante": 2015104425, "descripcion": " algun lugar gg3", "leido": false, "idService": 2 },
            { "id": 55, "tipo": "ape", "estudiante": 2015104425, "descripcion": " algun lugar gg3", "leido": false, "idService": 2 },
        ];
    }
    NotificationsService.prototype.createEmail = function (request) {
        return this._http.post(this._Server.direction + 'ce/Notification/', request).map(function (res) { return res.json(); });
    };
    NotificationsService.prototype.getAll = function () {
        //this._http.get('');
        return Observable_1.Observable.of(this.obj); //borrar
    };
    NotificationsService.prototype.getByID = function (id) {
        //this._http.get('');
        console.log(' You want the inclusion  ' + id);
        return Observable_1.Observable.of(this.obj); //borrar
    };
    NotificationsService.prototype.changeState = function (id, state) {
        console.log("cambiar el estado de" + id + " a: " + state);
    };
    NotificationsService.prototype.deleteByID = function (id) {
        console.log(' Delete the inclusion  ' + id);
    };
    NotificationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], NotificationsService);
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map