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
var StudentsService = (function () {
    function StudentsService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
    }
    /**
     * Get all the students
     */
    StudentsService.prototype.getAll = function () {
        return this._http.get(this._Server.directionUsers + 'ce/Students').map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    StudentsService.prototype.updateAll = function () {
    };
    /**
     *  Get the information of an specific student
     * @param id The identification of the student
     */
    StudentsService.prototype.getByID = function (id) {
        return this._http.get(this._Server.directionUsers + 'ce/Students/' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    /**
     * Delete one student by id
     * @param id The id of the student
     */
    StudentsService.prototype.deleteByID = function (id) {
        console.log(' Delete the inclusion  ' + id);
    };
    StudentsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], StudentsService);
    return StudentsService;
}());
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map