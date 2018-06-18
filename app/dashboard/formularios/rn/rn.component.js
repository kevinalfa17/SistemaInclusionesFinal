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
var request_service_1 = require('../../../shared/request.service');
var router_1 = require('@angular/router');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var common_1 = require('@angular/common');
var RNComponent = (function () {
    function RNComponent(requestService, router, datePipe) {
        this.requestService = requestService;
        this.router = router;
        this.datePipe = datePipe;
        this.cursoLevantar = null;
        this.creditosLevantar = null;
        this.rn = null;
        this.phone = null;
        this.telephone = null;
        this.score = null;
        this.previousScore = null;
        this.selectLevantar = null;
        this.letter = null;
        this.courses = [];
        this.disabled = false;
        this.mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
    RNComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestService.getConfig().subscribe(function (data) {
            console.log(data);
            var tempDate = data.fecha_intermedio.split("T")[0];
            var actualDate = new Date();
            var finalDate = new Date(tempDate);
            console.log("actualDate " + actualDate);
            console.log("finalDate " + finalDate);
            if (actualDate <= finalDate) {
                _this.disabled = false;
                console.log("enabled");
            }
            else {
                _this.disabled = true;
                console.log("disabled");
            }
        }),
            function (err) { return console.log("Error", err); };
        this.requestService.getCourses().subscribe(function (data) {
            console.log(data);
            _this.courses = data;
        }),
            function (err) { return console.log("Error", err); };
    };
    RNComponent.prototype.onChange1 = function (val) {
        this.cursoLevantar = this.courses[val].codigo;
        this.creditosLevantar = this.courses[val].creditos;
    };
    RNComponent.prototype.save = function () {
        swal({
            title: 'Guardando'
        });
        swal.showLoading();
        this.sendForm("Guardado");
    };
    RNComponent.prototype.send = function () {
        var _this = this;
        if (this.phone == null || this.telephone == null || this.score == null || this.previousScore == null
            || this.rn == null) {
            if (this.selectLevantar == null) {
                swal({
                    title: "Error",
                    text: "No puede enviar un formulario sin especificar curso",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-danger",
                    type: "error"
                });
            }
            else {
                swal({
                    title: '¿Estas seguro?',
                    text: "Esta apunto de enviar un formulario con errores o campos vacios",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Enviar de todas formas',
                    buttonsStyling: false
                }).then(function () {
                    swal({
                        title: 'Enviando'
                    });
                    swal.showLoading();
                    _this.sendForm("Enviado");
                });
            }
        }
        else {
            swal({
                title: 'Enviando'
            });
            swal.showLoading();
            this.sendForm("Enviado");
        }
    };
    RNComponent.prototype.sendForm = function (state) {
        var _this = this;
        var tempDate = null;
        var date = null;
        if (state == "Enviado") {
            tempDate = Date.now();
            date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
            console.log(date);
        }
        var request = {
            "correo_electronico": ng2_cookies_1.Cookie.get("correo"),
            "telefono": this.phone,
            "telefono_fijo": this.telephone,
            "promedio_general": this.score,
            "promedio_semestre_anterior": this.previousScore,
            "estudiante": ng2_cookies_1.Cookie.get("carne"),
            "curso": this.cursoLevantar,
            "rn": this.rn,
            "periodo": 1,
            "fecha_solicitud": date,
            "estado_solicitud": state,
            "carta": this.letter,
        };
        console.log("request" + JSON.stringify(request));
        this.requestService.sendRn(request).subscribe(function (data) {
            console.log(data);
            swal.close();
            if (state == "Guardado") {
                //Guardado!
                swal({
                    title: "Guardado",
                    text: "Su formulario ha sido guardado exitosamente",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    type: "success"
                }).then(function () {
                    _this.router.navigate(['/estudiantes/solicitudes/']);
                });
            }
            else {
                swal({
                    title: 'Enviado',
                    text: 'Su formulario ha sido enviado exitosamente',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function () {
                    _this.router.navigate(['/estudiantes/solicitudes/']);
                });
            }
        }),
            function (err) { return console.log("Error", err); };
    };
    RNComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rn-cmp',
            templateUrl: 'rn.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie, common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, router_1.Router, common_1.DatePipe])
    ], RNComponent);
    return RNComponent;
}());
exports.RNComponent = RNComponent;
//# sourceMappingURL=rn.component.js.map