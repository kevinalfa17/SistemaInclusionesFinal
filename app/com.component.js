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
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var router_1 = require('@angular/router');
var ComComponent = (function () {
    function ComComponent(router) {
        this.router = router;
    }
    ComComponent.prototype.ngOnInit = function () {
        if ((ng2_cookies_1.Cookie.get("role2") != "3")) {
            ng2_cookies_1.Cookie.deleteAll();
            this.router.navigate(['loginAdCo']);
        }
    };
    ComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'com-cmp',
            templateUrl: 'com.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ComComponent);
    return ComComponent;
}());
exports.ComComponent = ComComponent;
//# sourceMappingURL=com.component.js.map