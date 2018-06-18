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
var auth_service_1 = require('../../shared/auth.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var UserInfoComComponent = (function () {
    function UserInfoComComponent(_reqService, router) {
        this._reqService = _reqService;
        this.router = router;
    }
    UserInfoComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'userInfoCom-cmp',
            templateUrl: 'userInfoCom.component.html',
            providers: [auth_service_1.AuthService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], UserInfoComComponent);
    return UserInfoComComponent;
}());
exports.UserInfoComComponent = UserInfoComComponent;
//# sourceMappingURL=userInfoCom.component.js.map