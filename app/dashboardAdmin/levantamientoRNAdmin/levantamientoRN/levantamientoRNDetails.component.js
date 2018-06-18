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
var common_1 = require('@angular/common');
var levantamientoRN_service_1 = require('../../services/levantamientoRN.service');
var curses_service_1 = require('../../services/curses.service');
var students_service_1 = require('../../services/students.service');
var settings_service_1 = require('../../services/settings.service');
var LevantamientoRNDetailsAdminComponent = (function () {
    function LevantamientoRNDetailsAdminComponent(_route, _location, _requestService, _cursesService, _studentsService, _settingsService) {
        this._route = _route;
        this._location = _location;
        this._requestService = _requestService;
        this._cursesService = _cursesService;
        this._studentsService = _studentsService;
        this._settingsService = _settingsService;
        this.cursesDetails = []; // Details of the curses of the current semester
        this.allSchools = []; // Details of the curses of the current semester
    }
    LevantamientoRNDetailsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestSubscribe = this._route.params.subscribe(function (params) {
            _this.levantamientoRNId = params['levantamientoRNID']; // get the id
            _this.requestDetails =
                {
                    "telefono": 0, "promedio_general": 0, "promedio_general_anterior": 0,
                    "estudiante": 0, "curso": 0,
                    "periodo": "",
                    "fecha_solicitud": "",
                    "id": 0, "observacion_solicitud": "", "estado": "",
                    "encargado_solicitud": "", "requiere_proceso": "",
                    "carta": "", "se_requiere": 0, "se_requiere_tipo": 0
                }; // sacar del estudiante con el atributo id de estudiante: nombre, correo, carnet
            _this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };
            _this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };
            _this.periodList = { "anno": "", "semestre": "" };
            _this._cursesService.getAllSchools().subscribe(// get the details
            function (// get the details
                resp) {
                _this.allSchools = resp; // assign to the local object 
            });
            console.log(_this.levantamientoRNId);
            _this._requestService.getByID(_this.levantamientoRNId).subscribe(// get the details
            function (// get the details
                resp) {
                _this.requestDetails = resp; // assign to the local object
                _this._settingsService.getPeriodById(resp.periodo).subscribe(// get the status
                function (// get the status
                    resp) {
                    _this.periodList = resp; // assign to the local object        
                });
                _this._studentsService.getByID(_this.requestDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.studentDetails = resp; // assign to the local object        
                });
                _this._cursesService.getByCurriStudent(_this.requestDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursesDetails = resp; // assign to the local object   
                    var i = 0;
                    while (i < resp.length) {
                        var temInd = _this.searchPosSchool(resp[i].id);
                        if (temInd == -1) {
                            _this.cursesDetails[i].escuela = "No definida";
                        }
                        else {
                            _this.cursesDetails[i].escuela = _this.allSchools[temInd].nombre;
                        }
                        i++;
                    }
                });
                _this._cursesService.getByID(_this.requestDetails.curso).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursoSolicitaDetails = resp; // assign to the local object        
                });
                _this._cursesService.getByID(_this.requestDetails.curso).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursoSolicitaDetails = resp; // assign to the local object        
                });
            });
        });
    };
    LevantamientoRNDetailsAdminComponent.prototype.searchPosSchool = function (id) {
        var i = 0;
        var pos = -1;
        while (i < this.allSchools.length) {
            if (id == this.allSchools[i].id) {
                pos = i;
                break;
            }
            else {
                i++;
            }
        }
        return pos;
    };
    LevantamientoRNDetailsAdminComponent.prototype.ngOnDestroy = function () {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    LevantamientoRNDetailsAdminComponent.prototype.navigateToParent = function () {
        this._location.back();
    };
    ;
    LevantamientoRNDetailsAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Admin-cmp',
            templateUrl: 'levantamientoRNDetails.component.html',
            providers: [levantamientoRN_service_1.LevantamientoRNService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService] // the provider of RN
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, levantamientoRN_service_1.LevantamientoRNService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService])
    ], LevantamientoRNDetailsAdminComponent);
    return LevantamientoRNDetailsAdminComponent;
}());
exports.LevantamientoRNDetailsAdminComponent = LevantamientoRNDetailsAdminComponent;
//# sourceMappingURL=levantamientoRNDetails.component.js.map