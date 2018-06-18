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
var request_service_1 = require('../../shared/request.service');
var router_1 = require('@angular/router');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var ApelacionesComponent = (function () {
    /*constructor() {
        this.data = [["100","REQ", "2018-01-01","https://www.google.com"], ["101","RN", "2018-01-01","https://www.google.com"]];
        this.structure = {columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "", type: "link", linkText: "Apelar", editable: false }], header: true, footer: false, edit: false, delete: true };

        this.data2 = [["123","REQ", "2018-01-01","En revisión"]];
        this.structure2 = { columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "Estado", type: "text", editable: false }], header: true, footer: false, edit: false, delete: false };
    }*/
    function ApelacionesComponent(requestService, router) {
        this.requestService = requestService;
        this.router = router;
        this.data = []; //List of rows (arrays) with all data
        this.structure = {}; //Structure of the table
        this.data2 = []; //List of rows (arrays) with all data
        this.structure2 = {}; //Structure of the table
    }
    ApelacionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.structure = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "date", editable: false }, { name: "", type: "link", linkText: "Apelar", editable: false }], header: true, footer: false, edit: false, delete: true };
        this.structure2 = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "Estado", type: "text", editable: false }], header: true, footer: false, edit: false, delete: false };
        this.requestService.getInclusion(ng2_cookies_1.Cookie.get("Carne")).subscribe(function (data) {
            console.log("data1");
            console.log(data);
            _this.fillData(data, "inc");
        }),
            function (err) { return console.log("Error", err); };
        this.requestService.getRequirements(ng2_cookies_1.Cookie.get("Carne")).subscribe(function (data) {
            console.log("data2");
            console.log(data);
            _this.fillData(data, "req");
        }),
            function (err) { return console.log("Error", err); };
        this.requestService.getRn(ng2_cookies_1.Cookie.get("Carne")).subscribe(function (data) {
            console.log("data3");
            console.log(data);
            _this.fillData(data, "rn");
        }),
            function (err) { return console.log("Error", err); };
    };
    ApelacionesComponent.prototype.fillData = function (object, type) {
        console.log("fill");
        for (var i = 0; i < object.length; i++) {
            if (object[i].estado_solicitud == "Rechazado") {
                this.data.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, type + "/" + object[i].id]);
            }
            if (object[i].apelacion !== null) {
                this.data2.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, object[i].estado_apelacion]);
            }
        }
    };
    ApelacionesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'apelaciones-cmp',
            templateUrl: 'apelaciones.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, router_1.Router])
    ], ApelacionesComponent);
    return ApelacionesComponent;
}());
exports.ApelacionesComponent = ApelacionesComponent;
//# sourceMappingURL=apelaciones.component.js.map