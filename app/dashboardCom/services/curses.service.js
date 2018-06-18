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
var CursesService = (function () {
    function CursesService(_Server, _http) {
        this._Server = _Server;
        this._http = _http;
    }
    /**
     * Get all the curses
     */
    CursesService.prototype.getAll = function () {
        return this._http.get(this._Server.direction + 'ce/Courses').map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj); //borrar    
    };
    /**
     *  Check all the parameters of a curse by id
     * @param code The identification of the curse
     */
    CursesService.prototype.getByID = function (code) {
        return this._http.get(this._Server.direction + 'ce/Courses?code=' + code).map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj[0]); //borrar 
    };
    /**
     * Delete a curse by their identification
     * @param id The identification of the inclusion
     */
    CursesService.prototype.deleteByID = function (id) {
        console.log(' Delete the inclusion  ' + id);
    };
    /**
     *  Get the curses of the semester
     * @param id The identification of the inclusion
     */
    CursesService.prototype.getByCurriStudent = function (id) {
        return this._http.get(this._Server.direction + 'ce/CoursePlan?student=' + id).map(function (res) { return res.json(); }).catch(this._Server.handleError);
        // return Observable.of(this.obj); //borrar    
    };
    /**
     * Get all the schools
     */
    CursesService.prototype.getAllSchools = function () {
        return this._http.get(this._Server.direction + 'ce/Schools').map(function (res) { return res.json(); }).catch(this._Server.handleError);
        //return Observable.of(this.obj2); //borrar    
    };
    /**
     * Get a school by id
     * @param ID The id of the school
     */
    CursesService.prototype.getSchoolById = function (ID) {
        return this._http.get(this._Server.direction + 'ce/Schools?code=' + ID).map(function (res) { return res.json(); }).catch(this._Server.handleError);
    };
    CursesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService, http_1.Http])
    ], CursesService);
    return CursesService;
}());
exports.CursesService = CursesService;
//# sourceMappingURL=curses.service.js.map