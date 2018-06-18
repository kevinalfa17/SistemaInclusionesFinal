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
var sidebarAdmin_routes_config_1 = require('../.././sidebar/sidebarAdmin-routes.config');
var sidebar_metadata_1 = require('../.././sidebar/sidebar.metadata');
var common_1 = require('@angular/common');
var request_service_1 = require('../../shared/request.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var NavbarComponent = (function () {
    function NavbarComponent(location, requestService) {
        this.requestService = requestService;
        this.notifications = [];
        this.size = null;
        this.location = location;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listTitles = sidebarAdmin_routes_config_1.ROUTES.filter(function (listTitle) { return listTitle.menuType !== sidebar_metadata_1.MenuType.BRAND; });
        this.requestService.getNotifications(ng2_cookies_1.Cookie.get("correo")).subscribe(function (data) {
            console.log(data);
            _this.notifications = data;
            _this.size = _this.notifications.length;
        }),
            function (err) { return console.log("Error", err); };
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
            var titleTemp = titlee.split("/");
            titlee = "";
            for (var i = 1; i < titleTemp.length; i++) {
                titlee = titlee + titleTemp[i];
                if (i !== titleTemp.length - 1) {
                    titlee = titlee + "/";
                }
            }
        }
        titlee = titlee.split('/')[1];
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return titlee;
    };
    NavbarComponent.prototype.getPath = function () {
        // console.log(this.location);
        return this.location.prepareExternalUrl(this.location.path());
    };
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navbar-cmp',
            templateUrl: 'navbar.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [common_1.Location, request_service_1.RequestService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map