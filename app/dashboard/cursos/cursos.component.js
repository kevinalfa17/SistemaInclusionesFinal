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
var CursosComponent = (function () {
    function CursosComponent(requestService, router) {
        this.requestService = requestService;
        this.router = router;
        this.courses = [];
        this.planData = [];
        this.data = [];
        this.structure = { columns: [{ name: "Nombre", type: "text", editable: false }, { name: "Codigo", type: "text", editable: false }, { name: "Creditos", type: "text", editable: false }], header: true, footer: false, edit: false, delete: true };
    }
    CursosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestService.getCourses().subscribe(function (data) {
            console.log(data);
            _this.courses = data;
            //Get plan
            _this.requestService.getPlan(ng2_cookies_1.Cookie.get("carne")).subscribe(function (data) {
                _this.planData = data;
                _this.fillPlan();
            }),
                function (err) { return console.log("Error", err); };
        }),
            function (err) { return console.log("Error", err); };
    };
    CursosComponent.prototype.fillPlan = function () {
        var row;
        for (var i = 0; i < this.planData.length; i++) {
            for (var j = 0; j < this.courses.length; j++) {
                if (this.planData[i].curso == this.courses[j].codigo) {
                    row = [this.courses[j].nombre, this.courses[j].codigo, this.courses[j].creditos];
                }
            }
            this.data.push(row);
        }
    };
    CursosComponent.prototype.addCourse = function () {
        var exist = false;
        var i = this.selectedCourse;
        for (var j = 0; j < this.data.length; j++) {
            if (this.courses[i].codigo == this.data[j][1]) {
                exist = true;
            }
        }
        if (!exist) {
            this.data.push([this.courses[i].nombre, this.courses[i].codigo, this.courses[i].creditos]);
        }
    };
    CursosComponent.prototype.save = function () {
        swal({
            title: 'Guardando'
        });
        swal.showLoading();
        var request = [];
        for (var j = 0; j < this.data.length; j++) {
            var temp = { "estudiante": ng2_cookies_1.Cookie.get("carne"), "curso": this.data[j][1], "periodo": 1 };
            request.push(temp);
        }
        console.log("request " + JSON.stringify(request));
        this.requestService.savePlan(request, ng2_cookies_1.Cookie.get("carne")).subscribe(function (data) {
            console.log(data);
            swal.close();
            //Guardado!
            swal({
                title: "Guardado",
                text: "Su plan de estudios ha sido guardado exitosamente",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            });
        }),
            function (err) { return console.log("Error", err); };
    };
    CursosComponent.prototype.plan = function () {
        var myWindow = window.open("plan.html", "", "width=900,height=650");
    };
    CursosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cursos-cmp',
            templateUrl: 'cursos.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, router_1.Router])
    ], CursosComponent);
    return CursosComponent;
}());
exports.CursosComponent = CursosComponent;
//# sourceMappingURL=cursos.component.js.map