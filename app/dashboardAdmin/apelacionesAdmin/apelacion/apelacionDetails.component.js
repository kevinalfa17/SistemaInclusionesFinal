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
var appeals_service_1 = require('../../services/appeals.service');
var students_service_1 = require('../../services/students.service');
var settings_service_1 = require('../../services/settings.service');
var ApelacionDetailsAdminComponent = (function () {
    function ApelacionDetailsAdminComponent(_route, _settingsService, _router, _requestService, _studentsService) {
        this._route = _route;
        this._settingsService = _settingsService;
        this._router = _router;
        this._requestService = _requestService;
        this._studentsService = _studentsService;
    }
    ApelacionDetailsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestSubscribe = this._route.params.subscribe(function (params) {
            _this.apelacionId = params['apelacionId']; // get the id
            _this.apelacionTipo = params['apelaTipo']; // get the tipo
            _this.requestDetails =
                {
                    "id": 0,
                    "estudiante": 0,
                    "periodo": 0,
                    "fecha_apelacion": "",
                    "apelacion": "", "estado_apelacion": "",
                    "memo_apelacion": 0, "sesion_apelacion": 0,
                    "encargado_apelacion": "", "requiere_proceso": "",
                    "observacion_apelacion": ""
                };
            _this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };
            _this.periodList = { "anno": "", "semestre": "" };
            _this._requestService.getByID(_this.apelacionId, _this.apelacionTipo).subscribe(// get the details
            function (// get the details
                resp) {
                console.log('La solicitud');
                console.log(resp);
                console.log('Esesesese');
                _this._settingsService.getPeriodById(resp.periodo).subscribe(// get the status
                function (// get the status
                    resp) {
                    _this.periodList = resp; // assign to the local object        
                });
                _this.requestDetails = resp; // assign to the local object
                _this._studentsService.getByID(_this.requestDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.studentDetails = resp; // assign to the local object        
                });
            });
        });
    };
    ApelacionDetailsAdminComponent.prototype.ngOnDestroy = function () {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    ApelacionDetailsAdminComponent.prototype.navigateToParent = function () {
        this._router.navigate(['admin/apelacion']);
    };
    ;
    ApelacionDetailsAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Admin-cmp',
            templateUrl: 'apelacionDetails.component.html',
            providers: [appeals_service_1.AppealsService, students_service_1.StudentsService, settings_service_1.SettingsService] // the provider of apelacion
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, settings_service_1.SettingsService, router_1.Router, appeals_service_1.AppealsService, students_service_1.StudentsService])
    ], ApelacionDetailsAdminComponent);
    return ApelacionDetailsAdminComponent;
}());
exports.ApelacionDetailsAdminComponent = ApelacionDetailsAdminComponent;
//# sourceMappingURL=apelacionDetails.component.js.map