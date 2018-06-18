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
var request_service_1 = require('../../shared/request.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var common_1 = require('@angular/common');
var SolicitudComponent = (function () {
    function SolicitudComponent(activatedRoute, router, requestService, datePipe) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.requestService = requestService;
        this.datePipe = datePipe;
        this.disabled = false;
        //Phone mask
        this.mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        //Inc
        this.cursoLevantar = null;
        this.creditosLevantar = null;
        this.professor = null;
        this.group = null;
        this.phone = null;
        this.score = null;
        this.previousScore = null;
        this.enroll_date = null;
        this.course = null;
        this.check1 = true;
        this.check2 = true;
        this.check3 = true;
        this.cursoRN = null;
        this.cursoRequisitos = null;
        this.cursoLevantar2 = null;
        this.creditosLevantar2 = null;
        this.cursoLevantar3 = null;
        this.creditosLevantar3 = null;
        this.letter = null;
        //Req
        this.selectLevantar = null;
        this.selectMatricular = null;
        this.cursoMatricular = null;
        this.creditosMatricular = null;
        //RN
        this.rn = null;
        this.courses = [];
        this.telephone = null;
        this.type = activatedRoute.snapshot.params["type"];
        this.id = activatedRoute.snapshot.params["id"];
        $('.label-floating').removeClass('is-empty');
    }
    SolicitudComponent.prototype.ngOnInit = function () {
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
        switch (this.type) {
            case "inc":
                this.requestService.getSpecificInclusion(this.id).subscribe(function (data) {
                    _this.phone = data["telefono"];
                    _this.telephone = data["telefono_fijo"];
                    _this.score = data["promedio_general"];
                    _this.enroll_date = data["cita_matricula"];
                    _this.cursoLevantar = data["curso"];
                    _this.group = data["grupo"];
                    _this.professor = data["profesor"];
                    _this.letter = data["carta"];
                    for (var i = 0; i < _this.courses.length; i++) {
                        if (_this.courses[i].codigo == _this.cursoLevantar) {
                            _this.course = i;
                            _this.creditosLevantar = _this.courses[i].creditos;
                        }
                    }
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "req":
                this.requestService.getSpecificRequirement(this.id).subscribe(function (data) {
                    console.log("data" + data);
                    _this.phone = data["telefono"];
                    _this.telephone = data["telefono_fijo"];
                    _this.score = data["promedio_general"];
                    _this.previousScore = data["promedio_semestre_anterior"];
                    _this.cursoLevantar = data["curso_levantar"];
                    _this.cursoMatricular = data["curso_matricular"];
                    _this.letter = data["carta"];
                    console.log("reqqqqqq");
                    console.log("l" + _this.cursoLevantar);
                    console.log("m" + _this.cursoMatricular);
                    for (var i = 0; i < _this.courses.length; i++) {
                        if (_this.courses[i].codigo == _this.cursoLevantar) {
                            console.log("lev");
                            _this.selectLevantar = i;
                            _this.creditosLevantar = _this.courses[i].creditos;
                            console.log(_this.selectLevantar);
                        }
                        if (_this.courses[i].codigo == _this.cursoMatricular) {
                            console.log("matr");
                            _this.selectMatricular = i;
                            _this.creditosMatricular = _this.courses[i].creditos;
                            console.log(_this.selectMatricular);
                        }
                    }
                }),
                    function (err) { return console.log("Error", err); };
                break;
            case "rn":
                this.requestService.getSpecificRn(this.id).subscribe(function (data) {
                    console.log(JSON.stringify(data));
                    _this.phone = data["telefono"];
                    _this.telephone = data["telefono_fijo"];
                    _this.score = data["promedio_general"];
                    _this.previousScore = data["promedio_semestre_anterior"];
                    _this.cursoLevantar = data["curso"];
                    console.log("curso levantar " + _this.cursoLevantar);
                    _this.letter = data["carta"];
                    _this.rn = data["rn"];
                    for (var i = 0; i < _this.courses.length; i++) {
                        if (_this.courses[i].codigo == _this.cursoLevantar) {
                            _this.selectLevantar = i;
                            _this.creditosLevantar = _this.courses[i].creditos;
                            console.log("select levantar " + _this.selectLevantar);
                        }
                    }
                }),
                    function (err) { return console.log("Error", err); };
                break;
        }
    };
    SolicitudComponent.prototype.onChange1 = function (val) {
        this.cursoLevantar = this.courses[val].codigo;
        this.creditosLevantar = this.courses[val].creditos;
    };
    SolicitudComponent.prototype.onChange2 = function (val) {
        this.cursoLevantar2 = this.courses[val].codigo;
        this.creditosLevantar2 = this.courses[val].creditos;
        this.cursoMatricular = this.courses[val].codigo;
        this.creditosMatricular = this.courses[val].creditos;
    };
    SolicitudComponent.prototype.onChange3 = function (val) {
        this.cursoLevantar3 = this.courses[val].codigo;
        this.creditosLevantar3 = this.courses[val].creditos;
    };
    SolicitudComponent.prototype.back = function () {
        this.router.navigate(['../../../solicitudes'], { relativeTo: this.activatedRoute });
    };
    SolicitudComponent.prototype.save = function () {
        swal({
            title: 'Guardando'
        });
        swal.showLoading();
        this.sendForm("Guardado");
    };
    SolicitudComponent.prototype.send = function () {
        var _this = this;
        console.log("SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEND");
        console.log(this.type);
        var correct = true;
        switch (this.type) {
            case "inc":
                console.log("false aqui");
                if (this.professor == null || this.group == null || this.phone == null || this.telephone == null ||
                    this.score == null || this.enroll_date == null || this.course == null) {
                    console.log("false aqui12312312");
                    correct = false;
                }
                break;
            case "req":
                console.log("false aqui2");
                correct = !(this.telephone == null || this.phone == null || this.score == null || this.previousScore == null ||
                    this.selectLevantar == null);
                break;
            case "rn":
                console.log("false aqui3");
                correct = !(this.telephone == null || this.phone == null || this.score == null || this.previousScore == null
                    || this.selectLevantar == null || this.rn == null);
                break;
            default:
                correct = false;
        }
        if (correct == false) {
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
        else {
            swal({
                title: 'Enviando'
            });
            swal.showLoading();
            this.sendForm("Enviado");
        }
    };
    SolicitudComponent.prototype.sendForm = function (state) {
        var _this = this;
        var tempDate = null;
        var date = null;
        if (state == "Enviado") {
            tempDate = Date.now();
            date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
            console.log(date);
        }
        if (this.type == "inc") {
            var request = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "cita_matricula": this.enroll_date,
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
            this.requestService.updateInclusion(request, this.id).subscribe(function (data) {
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
        //Levantamiento de requisito
        if (this.type == "req") {
            var request2 = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "curso_levantar": this.cursoLevantar2,
                "curso_matricular": this.cursoLevantar,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            };
            this.requestService.updateRequirements(request2, this.id).subscribe(function (data) {
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
        if (this.type == "rn") {
            var request3 = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "curso": this.cursoLevantar3,
                "rn": this.rn,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            };
            this.requestService.updateRn(request3, this.id).subscribe(function (data) {
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
    SolicitudComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'solicitud-cmp',
            templateUrl: 'solicitud.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie, common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, request_service_1.RequestService, common_1.DatePipe])
    ], SolicitudComponent);
    return SolicitudComponent;
}());
exports.SolicitudComponent = SolicitudComponent;
//# sourceMappingURL=solicitud.component.js.map