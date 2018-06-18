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
var SolicitudesComponent = (function () {
    /*constructor() {
        this.data = [["130","REQ", "2018-01-01","Enviado","inc/1"], ["131","RN", "2018-01-01","Guardado","req/2"], ["132","INC", "2018-01-01","Guardado","rn/4"]];
        this.structure = {columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false },{ name: "Estado", type: "text", editable: false }, { name: "", type: "link", linkText: "Ver", editable: false }], header: true, footer: false, edit: false, delete: true };
    }*/
    function SolicitudesComponent(requestService, router) {
        this.requestService = requestService;
        this.router = router;
        this.data = []; //List of rows (arrays) with all data
        this.structure = {}; //Structure of the table
        this.inclusions = [];
        this.req = [];
        this.rn = [];
    }
    SolicitudesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.structure = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha Envio", type: "date", editable: false }, { name: "Estado", type: "text", editable: false }, { name: "", type: "link", linkText: "Ver", editable: false }], header: true, footer: false, edit: false, delete: true };
        this.requestService.getInclusion(ng2_cookies_1.Cookie.get("carne")).subscribe(function (data) {
            console.log("data1");
            console.log(data);
            _this.fillData(data, "inc");
        }),
            function (err) { return console.log("Error", err); };
        this.requestService.getRequirements(ng2_cookies_1.Cookie.get("carne")).subscribe(function (data) {
            console.log("data2");
            console.log(data);
            _this.fillData(data, "req");
        }),
            function (err) { return console.log("Error", err); };
        this.requestService.getRn(ng2_cookies_1.Cookie.get("carne")).subscribe(function (data) {
            console.log("data3");
            console.log(data);
            _this.fillData(data, "rn");
        }),
            function (err) { return console.log("Error", err); };
    };
    SolicitudesComponent.prototype.fillData = function (object, type) {
        console.log("fill");
        for (var i = 0; i < object.length; i++) {
            this.data.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, object[i].estado_solicitud, type + "/" + object[i].id]);
        }
    };
    SolicitudesComponent.prototype.onDelete = function (e) {
        console.log("deleted" + e);
        var formId = this.data[e][0];
        var formType = this.data[e][1];
        console.log(formId);
        console.log(formType);
        switch (formType) {
            case "INC":
                this.requestService.deleteInclusion(formId).subscribe(function (data) {
                    //console.log(data);
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "REQ":
                this.requestService.deleteRequirements(formId).subscribe(function (data) {
                    //console.log(data);
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "RN":
                this.requestService.deleteRn(formId).subscribe(function (data) {
                    //console.log(data);
                }),
                    function (err) { return console.log("Error", err); };
                break;
        }
    };
    SolicitudesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'solicitudes-cmp',
            templateUrl: 'solicitudes.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, router_1.Router])
    ], SolicitudesComponent);
    return SolicitudesComponent;
}());
exports.SolicitudesComponent = SolicitudesComponent;
//# sourceMappingURL=solicitudes.component.js.map