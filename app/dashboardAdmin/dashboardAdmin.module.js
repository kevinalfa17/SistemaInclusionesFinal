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
var forms_1 = require('@angular/forms');
var angular2_text_mask_1 = require('angular2-text-mask');
var table_module_1 = require('../shared/table/table.module');
var CHILD_COMPONENTS = [];
var DashboardAdminModule = (function () {
    function DashboardAdminModule() {
    }
    DashboardAdminModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                angular2_text_mask_1.TextMaskModule,
                platform_browser_1.BrowserModule,
                table_module_1.TableModule,
            ],
            declarations: [CHILD_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardAdminModule);
    return DashboardAdminModule;
}());
exports.DashboardAdminModule = DashboardAdminModule;
//# sourceMappingURL=dashboardAdmin.module.js.map