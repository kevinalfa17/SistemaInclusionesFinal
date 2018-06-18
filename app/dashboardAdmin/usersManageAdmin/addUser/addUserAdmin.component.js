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
var users_service_1 = require('../../services/users.service');
var AddUserAdminComponent = (function () {
    function AddUserAdminComponent(_usersService) {
        this._usersService = _usersService;
        this.dataServerUsersRoles = []; // Data from the server about roles 
        this.newUser = {
            "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
            "role": 0, "correo_electronico": ""
        };
    }
    AddUserAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._usersService.getAllAdminUsersRoles().subscribe(function (respuesta) {
            //console.log(respuesta);
            //this.dataServerUsersRoles = respuesta;
            var RecorrerWhile = 0;
            while (RecorrerWhile < respuesta.length) {
                if (respuesta[RecorrerWhile].sistema == 1) {
                    _this.dataServerUsersRoles.push(respuesta[RecorrerWhile]);
                }
                RecorrerWhile = RecorrerWhile + 1;
            }
            //console.log(this.dataServerUsersRoles);
        });
    };
    AddUserAdminComponent.prototype.ngAfterViewInit = function () {
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    };
    AddUserAdminComponent.prototype.registerUser = function () {
        //console.log("jhajajaja ::::::: " + JSON.stringify(this.newUser));
        this._usersService.registerUserAdmin(JSON.stringify(this.newUser));
        this.newUser = {
            "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
            "role": 0, "correo_electronico": ""
        };
    };
    AddUserAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-Users-Admin-cmp',
            templateUrl: 'addUserAdmin.component.html',
            providers: [users_service_1.UsersService] // the provider of inclusions
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], AddUserAdminComponent);
    return AddUserAdminComponent;
}());
exports.AddUserAdminComponent = AddUserAdminComponent;
//# sourceMappingURL=addUserAdmin.component.js.map