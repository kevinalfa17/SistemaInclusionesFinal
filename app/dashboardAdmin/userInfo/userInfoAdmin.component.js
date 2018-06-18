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
var router_1 = require('@angular/router');
var users_service_1 = require('../services/users.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var UserInfoAdminComponent = (function () {
    function UserInfoAdminComponent(_reqService, router) {
        this._reqService = _reqService;
        this.router = router;
        this.currentUser = {
            "correo_electronico": "",
            "contrasenna": "",
            "primer_nombre": "",
            "segundo_nombre": "",
            "primer_apellido": "",
            "segundo_apellido": "",
            "role": 0,
            "id": 0,
            "cedula": ""
        };
        this.pass = "";
    }
    UserInfoAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._reqService.getByID(ng2_cookies_1.Cookie.get("idUser")).subscribe(function (resp) {
            _this.currentUser = resp;
        });
    };
    UserInfoAdminComponent.prototype.updateData = function () {
        this._reqService.editData(this.currentUser.id, this.currentUser).subscribe(function (resp) {
            console.log(resp);
        });
    };
    UserInfoAdminComponent.prototype.update = function () {
        if (this.pass != "") {
            console.log('pass');
            this.currentUser.contrasenna = btoa(this.pass);
        }
        this.updateData();
    };
    UserInfoAdminComponent.prototype.logout = function () {
        ng2_cookies_1.Cookie.deleteAll();
        this.router.navigate(['loginAdCo']);
    };
    UserInfoAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'userInfoAdmin-cmp',
            templateUrl: 'userInfoAdmin.component.html',
            providers: [UserInfoAdminComponent, ng2_cookies_1.Cookie, users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, router_1.Router])
    ], UserInfoAdminComponent);
    return UserInfoAdminComponent;
}());
exports.UserInfoAdminComponent = UserInfoAdminComponent;
//# sourceMappingURL=userInfoAdmin.component.js.map