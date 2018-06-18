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
var request_service_1 = require('../shared/request.service');
var EstudiantesLoginComponent = (function () {
    //disabledButton: boolean = true;
    //public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/];
    function EstudiantesLoginComponent(router, requestService) {
        this.router = router;
        this.requestService = requestService;
        this.id = "";
        this.email = "";
    }
    EstudiantesLoginComponent.prototype.ngOnInit = function () {
        $.getScript('../../../../assets/js/core/jquery.validate.min.js');
        $('#registerFormValidation').validate();
    };
    /*onChange() {
        if (this.email !== "" && this.id !== "") {
            this.disabledButton = false;
        }
        else {
            this.disabledButton = true;
        }
    }*/
    EstudiantesLoginComponent.prototype.showTerms = function () {
        var _this = this;
        swal({
            showCancelButton: true,
            confirmButtonText: 'Acepto los terminos y condiciones',
            cancelButtonText: 'Cancelar',
            title: 'T&eacute;rminos y condiciones',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            html: '<textarea readonly style="resize:none; width:100%;height: 150px;overflow-y: auto;font-size: 13px">' +
                '1. Para dar trámite a su solicitud debe completar la totalidad del formulario, y entregarlo en las fechas establecidas.Si hay espacios en blanco o se detecta alguna falsedad en la información, el formulario no será tramitado.&#13;&#10;&#13;&#10;' +
                '2. El trámite es estrictamente personal y debe utilizar exclusivamente su correo y carné de estudiante.&#13;&#10;&#13;&#10;' +
                '3. Antes de presentar el formulario, infórmese sobre el documento: Lineamientos para Levantamiento de Requisitos, Correquisitos y Rn.&#13;&#10;&#13;&#10;' +
                '4. Los resultados del trámite, serán comunicados a través de la Asociación de Estudiantes de Ingeniería en Computadores (ASEIC); la solicitud del trámite, no garantiza el levantamiento solicitado.' +
                '</textarea><br>'
        }).then(function () {
            var request = {
                "carne": _this.id,
                "email": _this.email
            };
            _this.requestService.generateToken(request).subscribe(function (data) {
                console.log(data);
            }),
                function (err) { return console.log("Error", err); };
            _this.router.navigate(['login/verificacion', _this.id, _this.email]);
        });
    };
    EstudiantesLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'estudiantesLogin-cmp',
            templateUrl: 'estudiantesLogin.component.html',
            providers: [request_service_1.RequestService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, request_service_1.RequestService])
    ], EstudiantesLoginComponent);
    return EstudiantesLoginComponent;
}());
exports.EstudiantesLoginComponent = EstudiantesLoginComponent;
//# sourceMappingURL=estudiantesLogin.component.js.map