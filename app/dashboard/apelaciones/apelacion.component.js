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
var router_1 = require('@angular/router');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var request_service_1 = require('../../shared/request.service');
var common_1 = require('@angular/common');
var ApelacionComponent = (function () {
    function ApelacionComponent(activatedRoute, router, requestService, datePipe) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.requestService = requestService;
        this.datePipe = datePipe;
        this.type = activatedRoute.snapshot.params["type"];
        this.id = activatedRoute.snapshot.params["id"];
    }
    ApelacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        switch (this.type) {
            case "inc":
                this.requestService.getSpecificInclusion(this.id).subscribe(function (data) {
                    _this.observations = data.observacion_solicitud;
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "req":
                this.requestService.getSpecificRequirement(this.id).subscribe(function (data) {
                    _this.observations = data.observacion_solicitud;
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "rn":
                this.requestService.getSpecificRn(this.id).subscribe(function (data) {
                    _this.observations = data.observacion_solicitud;
                }),
                    function (err) { return console.log("Error", err); };
                break;
        }
    };
    ApelacionComponent.prototype.goForm = function () {
        this.router.navigate(['/estudiantes/solicitudes/', this.type, this.id]);
    };
    ApelacionComponent.prototype.apelar = function () {
        var _this = this;
        swal({
            title: 'Guardando'
        });
        swal.showLoading();
        var tempDate = null;
        var date = null;
        tempDate = Date.now();
        date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
        console.log(date);
        var request = {
            "apelacion": this.apelacion,
            "fecha_apelacion": date,
            "estado_apelacion": "Enviado"
        };
        switch (this.type) {
            case "inc":
                this.requestService.appealInclusion(this.id, request).subscribe(function (data) {
                    console.log(data);
                    swal.close();
                    swal({
                        title: "Enviado",
                        text: "Su apelacion ha sido realizada exitosamente",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).then(function () {
                        _this.router.navigate(['/estudiantes/apelaciones/']);
                    });
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "req":
                this.requestService.appealRequirements(this.id, request).subscribe(function (data) {
                    console.log(data);
                    swal.close();
                    swal({
                        title: "Enviado",
                        text: "Su apelacion ha sido realizada exitosamente",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).then(function () {
                        _this.router.navigate(['/estudiantes/apelaciones/']);
                    });
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "rn":
                this.requestService.appealRn(this.id, request).subscribe(function (data) {
                    console.log("appealrn");
                    console.log(data);
                    swal.close();
                    swal({
                        title: "Enviado",
                        text: "Su apelacion ha sido realizada exitosamente",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).then(function () {
                        _this.router.navigate(['/estudiantes/apelaciones/']);
                    });
                }),
                    function (err) { return console.log("Error", err); };
                break;
        }
    };
    ApelacionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'apelacion-cmp',
            templateUrl: 'apelacion.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie, common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, request_service_1.RequestService, common_1.DatePipe])
    ], ApelacionComponent);
    return ApelacionComponent;
}());
exports.ApelacionComponent = ApelacionComponent;
//# sourceMappingURL=apelacion.component.js.map