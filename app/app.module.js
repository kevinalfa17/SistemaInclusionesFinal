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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var dashboardAdmin_component_1 = require('./dashboardAdmin/dashboardAdmin.component');
var dashboardCom_component_1 = require('./dashboardCom/dashboardCom.component');
var dashboard_module_1 = require('./dashboard/dashboard.module');
var dashboardAdmin_module_1 = require('./dashboardAdmin/dashboardAdmin.module');
var dashboardCom_module_1 = require('./dashboardCom/dashboardCom.module');
var sidebar_module_1 = require('./sidebar/sidebar.module');
var sidebarAdmin_module_1 = require('./sidebar/sidebarAdmin.module');
var sidebarCom_module_1 = require('./sidebar/sidebarCom.module');
var footer_module_1 = require('./shared/footer/footer.module');
var navbar_module_1 = require('./shared/navbar/navbar.module');
var common_1 = require('@angular/common');
var server_service_1 = require('./shared/server.service');
//Components and routes from routing file
var app_routes_1 = require('./app.routes');
var forms_1 = require('@angular/forms');
var table_module_1 = require('./shared/table/table.module');
var angular2_text_mask_1 = require('angular2-text-mask');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                angular2_text_mask_1.TextMaskModule,
                dashboard_module_1.DashboardModule,
                dashboardAdmin_module_1.DashboardAdminModule,
                dashboardCom_module_1.DashboardComModule,
                sidebar_module_1.SidebarModule,
                sidebarAdmin_module_1.SidebarAdminModule,
                sidebarCom_module_1.SidebarComModule,
                navbar_module_1.NavbarModule,
                footer_module_1.FooterModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                table_module_1.TableModule,
                router_1.RouterModule.forRoot(app_routes_1.MODULE_ROUTES)
            ],
            declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, dashboardAdmin_component_1.DashboardAdminComponent, dashboardCom_component_1.DashboardComComponent, app_routes_1.MODULE_COMPONENTS],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, server_service_1.ServerService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map