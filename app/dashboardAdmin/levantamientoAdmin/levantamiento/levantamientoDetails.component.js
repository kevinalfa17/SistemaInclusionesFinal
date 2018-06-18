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
var levantamiento_service_1 = require('../../services/levantamiento.service');
var curses_service_1 = require('../../services/curses.service');
var students_service_1 = require('../../services/students.service');
var settings_service_1 = require('../../services/settings.service');
var LevantamientoDetailsAdminComponent = (function () {
    function LevantamientoDetailsAdminComponent(_route, _location, _requestService, _cursesService, _studentsService, _settingsService) {
        this._route = _route;
        this._location = _location;
        this._requestService = _requestService;
        this._cursesService = _cursesService;
        this._studentsService = _studentsService;
        this._settingsService = _settingsService;
        this.cursesDetails = []; // Details of the curses of the current semester
        this.allSchools = []; // Details of the curses of the current semester
    }
    LevantamientoDetailsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.requestSubscribe = this._route.params.subscribe(function (params) {
            _this.levantamientoId = params['levantamientoId']; // get the id
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
            _this.cursoSolicitaDetailsMat = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };
            _this.periodList = { "anno": "", "semestre": "" };
            _this._cursesService.getAllSchools().subscribe(// get the details
            function (// get the details
                resp) {
                _this.allSchools = resp; // assign to the local object 
            });
            _this._requestService.getByID(_this.levantamientoId).subscribe(// get the details
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
                    // console.log('El req de los cursos del semestre');
                    // console.log(this.requestDetails.id);
                    // console.log(resp);
                    // console.log('Eso seria');
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
                _this._cursesService.getByID(_this.requestDetails.curso_levantar).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursoSolicitaDetails = resp; // assign to the local object        
                });
                _this._cursesService.getByID(_this.requestDetails.curso_matricular).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursoSolicitaDetailsMat = resp; // assign to the local object        
                });
            });
        });
    };
    LevantamientoDetailsAdminComponent.prototype.searchPosSchool = function (id) {
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
    LevantamientoDetailsAdminComponent.prototype.ngOnDestroy = function () {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    LevantamientoDetailsAdminComponent.prototype.navigateToParent = function () {
        this._location.back();
    };
    ;
    LevantamientoDetailsAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Admin-cmp',
            templateUrl: 'levantamientoDetails.component.html',
            providers: [levantamiento_service_1.LevantamientoService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService] // the provider of levantamiento
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, levantamiento_service_1.LevantamientoService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService])
    ], LevantamientoDetailsAdminComponent);
    return LevantamientoDetailsAdminComponent;
}());
exports.LevantamientoDetailsAdminComponent = LevantamientoDetailsAdminComponent;
//# sourceMappingURL=levantamientoDetails.component.js.map