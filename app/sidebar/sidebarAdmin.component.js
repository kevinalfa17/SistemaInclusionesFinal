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
var sidebarAdmin_routes_config_1 = require('./sidebarAdmin-routes.config');
var sidebar_metadata_1 = require('./sidebar.metadata');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var SidebarAdminComponent = (function () {
    function SidebarAdminComponent() {
        this.userInfo = { "idUser": "", "correo": "", "nombre": "", "role1": "", "role2": "" };
    }
    SidebarAdminComponent.prototype.ngOnInit = function () {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = sidebarAdmin_routes_config_1.ROUTES.filter(function (menuItem) { return menuItem.menuType !== sidebar_metadata_1.MenuType.BRAND; });
        // console.log( Cookie.get("correo") );
        this.userInfo.nombre = ng2_cookies_1.Cookie.get("nombre");
    };
    SidebarAdminComponent.prototype.deleteCookies = function () {
        ng2_cookies_1.Cookie.deleteAll();
    };
    SidebarAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebarAdmin-cmp',
            templateUrl: 'sidebarAdmin.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarAdminComponent);
    return SidebarAdminComponent;
}());
exports.SidebarAdminComponent = SidebarAdminComponent;
//# sourceMappingURL=sidebarAdmin.component.js.map