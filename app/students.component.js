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
var StudentsComponent = (function () {
    function StudentsComponent(router) {
        this.router = router;
    }
    StudentsComponent.prototype.ngOnInit = function () {
        if (ng2_cookies_1.Cookie.get("carne") == null) {
            this.router.navigate(['/login']);
        }
    };
    StudentsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'students-cmp',
            templateUrl: 'students.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], StudentsComponent);
    return StudentsComponent;
}());
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.component.js.map