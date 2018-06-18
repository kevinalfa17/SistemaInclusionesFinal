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
var sidebarCom_routes_config_1 = require('./sidebarCom-routes.config');
var sidebar_metadata_1 = require('./sidebar.metadata');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var SidebarComComponent = (function () {
    function SidebarComComponent() {
        this.userInfo = { "idUser": "", "correo": "", "nombre": "", "role1": "", "role2": "" };
    }
    SidebarComComponent.prototype.ngOnInit = function () {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = sidebarCom_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType !== sidebar_metadata_1.MenuType.BRAND; });
        this.userInfo.nombre = ng2_cookies_1.Cookie.get("nombre");
    };
    SidebarComComponent.prototype.deleteCookies = function () {
        ng2_cookies_1.Cookie.deleteAll();
    };
    SidebarComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebarCom-cmp',
            templateUrl: 'sidebarCom.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComComponent);
    return SidebarComComponent;
}());
exports.SidebarComComponent = SidebarComComponent;
//# sourceMappingURL=sidebarCom.component.js.map