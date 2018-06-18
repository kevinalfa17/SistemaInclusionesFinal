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
var UsersService = (function () {
    function UsersService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
        //borrar
        this.obj = [
            {
                "primer_nombre": "Mario", "segundo_nombre": "Mario2", "primer_apellido": "Kart", "segundo_apellido": "Kart2",
                "role": 2, "correo_electronico": "km@ggizi.com"
            },
            {
                "primer_nombre": "Mario", "segundo_nombre": "Mario2", "primer_apellido": "Kart", "segundo_apellido": "Kart2",
                "role": 1, "correo_electronico": "km@ggizi.com"
            },
        ];
        //borrar
        this.obj2 = [{ "id": 1, "name": "profe", "system": 1, "description": "dan clases" },
            { "id": 2, "name": "estudiante", "system": 1, "description": "van a clases" },
            { "id": 3, "name": "profe no aparecer", "system": 2, "description": "dan clases no aparecer" },
            { "id": 4, "name": "estudiante no aparecer", "system": 2, "description": "van a clases no aparecer" }];
    }
    /**
     *  Check all the parameters of the current configuration
     * @param code The identification of the inclusion
     */
    UsersService.prototype.getAllComUsers = function () {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);
        return Observable_1.Observable.of(this.obj); //borrar    
    };
    /**
     * Return a specific user
     * @param id Identificador
     */
    UsersService.prototype.getByID = function (id) {
        return this._http.get(this._Server.directionUsers + 'ce/Users/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    UsersService.prototype.editData = function (id, req) {
        return this._http.put(this._Server.directionUsers + 'ce/Users/' + id, req).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     *  Check all the types of roles
     */
    UsersService.prototype.getAllComUsersRoles = function () {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);
        return Observable_1.Observable.of(this.obj2); //borrar    
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map