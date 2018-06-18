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
var common_1 = require('@angular/common'); //private _location: Location,
var inclusions_service_1 = require('../../services/inclusions.service');
var curses_service_1 = require('../../services/curses.service');
var students_service_1 = require('../../services/students.service');
var settings_service_1 = require('../../services/settings.service');
var InclusionesDetailsAdminComponent = (function () {
    function InclusionesDetailsAdminComponent(_route, _location, _inclusionService, _cursesService, _studentsService, _settingsService) {
        this._route = _route;
        this._location = _location;
        this._inclusionService = _inclusionService;
        this._cursesService = _cursesService;
        this._studentsService = _studentsService;
        this._settingsService = _settingsService;
        this.cursesDetails = []; // Details of the curses of the current semester
        this.allSchools = []; // Details of the curses of the current semester
    }
    InclusionesDetailsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inclusionSubscribe = this._route.params.subscribe(function (params) {
            _this.inclusionId = params['inclusionID']; // get the id
            _this.inclusionDetails = {
                "telefono": 0, "promedio_general": 0, "cita_matricula": "00/00/0000",
                "curso": "Default", "grupo": 0, "periodo": 0,
                "id": 0, "estudiante": 0,
                "telefono_fijo": 0, "promedio_general_anterior": 0,
                "profesor": "",
                "fecha_solicitud": "",
                "memo_solicitud": 0, "sesion_solicitud": 0,
                "observacion_solicitud": "", "estado": "",
                "encargado_solicitud": "", "requiere_proceso": "",
                "carta": ""
            }; // sacar del estudiante con el atributo id de estudiante: nombre, correo, carnet
            _this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };
            _this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };
            _this.reqDetails = { "type": "", "cursos": { "escuelas": { "nombre": "" }, "nombre": "", "codigo": "" } };
            _this.periodList = { "anno": "", "semestre": "" };
            _this._inclusionService.getByID(_this.inclusionId).subscribe(// get the details
            function (// get the details
                resp) {
                _this.inclusionDetails = resp; // assign to the local object
                // console.log(resp);
                // console.log('El req de la inclusion');
                // console.log(resp);
                // console.log('Eso seria');
                _this._inclusionService.getReq(_this.inclusionDetails.id).subscribe(// get the details
                function (// get the details
                    resp) {
                    // console.log('El req de todos los relacionados');
                    // console.log(resp);
                    // console.log(resp.lc);
                    // console.log('Eso seria');
                    if (resp.type == 'req') {
                        _this.reqDetails = resp.lc; // assign to the local object        
                        _this.reqDetails.type = 'Levantamiento de requisito'; // assign to the local object        
                    }
                    if (resp.type == 'reqRN') {
                        _this.reqDetails = resp.lrn; // assign to the local object       
                        _this.reqDetails.type = 'Levantamiento de requisito RN'; // assign to the local object    
                    }
                });
                _this._settingsService.getPeriodById(resp.periodo).subscribe(// get the status
                function (// get the status
                    resp) {
                    // console.log('El req de periodo');
                    // console.log(resp);
                    // console.log('Eso seria');
                    _this.periodList = resp; // assign to the local object   
                });
                _this._cursesService.getAllSchools().subscribe(// get the details
                function (// get the details
                    resp) {
                    // console.log('El req schools');
                    // console.log(resp);
                    // console.log('Eso seria');
                    _this.allSchools = resp; // assign to the local object   
                });
                _this._studentsService.getByID(_this.inclusionDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    // console.log('El req de estudiante');
                    // console.log(this.inclusionDetails.estudiante);
                    // console.log(resp);
                    // console.log('Eso seria');
                    _this.studentDetails = resp; // assign to the local object    
                });
                _this._cursesService.getByCurriStudent(_this.inclusionDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursesDetails = resp; // assign to the local object        
                    var i = 0;
                    // console.log('El req de los cursos del semestre');
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
                _this._cursesService.getByID(_this.inclusionDetails.curso).subscribe(// get the details
                function (// get the details
                    resp) {
                    // console.log('El req by id del curso');
                    // console.log(resp);
                    // console.log('Eso seria');
                    _this.cursoSolicitaDetails = resp; // assign to the local object    
                });
            });
        });
    };
    InclusionesDetailsAdminComponent.prototype.searchPosSchool = function (id) {
        var i = 0;
        var pos = -1;
        while (i < this.allSchools.length) {
            if (id == this.allSchools[i].codigo) {
                pos = i;
                break;
            }
            else {
                i++;
            }
        }
        return pos;
    };
    InclusionesDetailsAdminComponent.prototype.ngOnDestroy = function () {
        this.inclusionSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    InclusionesDetailsAdminComponent.prototype.navigateToParent = function () {
        this._location.back();
    };
    ;
    InclusionesDetailsAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Admin-cmp',
            templateUrl: 'inclusionDetails.component.html',
            providers: [inclusions_service_1.InclusionsService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService] // the provider of inclusions
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, inclusions_service_1.InclusionsService, curses_service_1.CursesService, students_service_1.StudentsService, settings_service_1.SettingsService])
    ], InclusionesDetailsAdminComponent);
    return InclusionesDetailsAdminComponent;
}());
exports.InclusionesDetailsAdminComponent = InclusionesDetailsAdminComponent;
//# sourceMappingURL=inclusionDetails.component.js.map