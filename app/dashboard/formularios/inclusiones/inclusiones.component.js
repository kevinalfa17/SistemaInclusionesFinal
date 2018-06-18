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
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var InclusionesComponent = (function () {
    function InclusionesComponent(requestService, datePipe, router) {
        this.requestService = requestService;
        this.datePipe = datePipe;
        this.router = router;
        this.cursoLevantar = null;
        this.creditosLevantar = null;
        this.professor = null;
        this.group = null;
        this.phone = null;
        this.telephone = null;
        this.score = null;
        this.previousScore = null;
        this.enroll_date = null;
        this.course = null;
        this.letter = null;
        this.check1 = false;
        this.check2 = false;
        this.check3 = false;
        this.cursoRN = null;
        this.cursoRequisitos = null;
        this.cursoLevantar2 = null;
        this.creditosLevantar2 = null;
        this.cursoLevantar3 = null;
        this.creditosLevantar3 = null;
        this.courses = [];
        this.rn = null;
        this.disabled = false;
        //Phone mask
        this.mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
    InclusionesComponent.prototype.ngOnInit = function () {
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
    InclusionesComponent.prototype.onChange1 = function (val) {
        this.cursoLevantar = this.courses[val].codigo;
        this.creditosLevantar = this.courses[val].creditos;
    };
    InclusionesComponent.prototype.onChange2 = function (val) {
        this.cursoLevantar2 = this.courses[val].codigo;
        this.creditosLevantar2 = this.courses[val].creditos;
    };
    InclusionesComponent.prototype.onChange3 = function (val) {
        this.cursoLevantar3 = this.courses[val].codigo;
        this.creditosLevantar3 = this.courses[val].creditos;
    };
    InclusionesComponent.prototype.save = function () {
        swal({
            title: 'Guardando'
        });
        swal.showLoading();
        this.sendForm("Guardado");
    };
    InclusionesComponent.prototype.send = function () {
        var _this = this;
        var correct = true;
        if (this.professor == null || this.group == null || this.phone == null || this.telephone == null ||
            this.score == null || this.enroll_date == null || this.course == null) {
            correct = false;
        }
        if ((this.check1 || this.check2 || this.check3)) {
            if (this.previousScore == null || ((this.check1 || this.check2) && this.cursoRequisitos == null)
                || (this.check3 && this.cursoRN == null))
                correct = false;
        }
        if (correct == false) {
            if ((this.course == null) || (this.check3 && this.cursoRN == null) || ((this.check1 || this.check2) && this.cursoRequisitos == null)) {
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
    InclusionesComponent.prototype.sendForm = function (state) {
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
            "cita_matricula": this.enroll_date,
            "estudiante": ng2_cookies_1.Cookie.get("carne"),
            "curso": this.cursoLevantar,
            "grupo": Number(this.group),
            "profesor": this.professor,
            "periodo": 1,
            "fecha_solicitud": date,
            "estado_solicitud": state,
            "carta": this.letter,
        };
        console.log();
        console.log("request" + JSON.stringify(request));
        this.requestService.sendInclusion(request).subscribe(function (data) {
            console.log(data);
            swal.close();
            if (!(_this.check1 || _this.check2 || _this.check3)) {
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
            }
        }),
            function (err) { return console.log("Error", err); };
        //Levantamiento de requisito
        if (this.check1 || this.check2) {
            console.log("req check");
            console.log(this.cursoLevantar2);
            console.log(this.cursoLevantar);
            var request2 = {
                "correo_electronico": ng2_cookies_1.Cookie.get("correo"),
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "estudiante": ng2_cookies_1.Cookie.get("carne"),
                "curso_levantar": this.cursoLevantar2,
                "curso_matricular": this.cursoLevantar,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            };
            console.log("request" + JSON.stringify(request2));
            this.requestService.sendRequirements(request2).subscribe(function (data) {
                console.log(data);
                swal.close();
                if (true) {
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
                }
            }),
                function (err) { return console.log("Error", err); };
        }
        //Levantamiento de RN
        if (this.check3) {
            var request3 = {
                "correo_electronico": ng2_cookies_1.Cookie.get("correo"),
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "estudiante": ng2_cookies_1.Cookie.get("carne"),
                "curso": this.cursoLevantar3,
                "rn": this.rn,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            };
            console.log("request" + JSON.stringify(request3));
            this.requestService.sendRn(request3).subscribe(function (data) {
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
        }
    };
    InclusionesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inclusiones-cmp',
            templateUrl: 'inclusiones.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie, common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, common_1.DatePipe, router_1.Router])
    ], InclusionesComponent);
    return InclusionesComponent;
}());
exports.InclusionesComponent = InclusionesComponent;
//# sourceMappingURL=inclusiones.component.js.map