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
var inclusions_service_1 = require('../../services/inclusions.service');
var curses_service_1 = require('../../services/curses.service');
var students_service_1 = require('../../services/students.service');
var users_service_1 = require('../../services/users.service');
var settings_service_1 = require('../../services/settings.service');
var notifications_service_1 = require('../../services/notifications.service'); // private _notifications: NotificationsService
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var InclusionesDetailsComComponent = (function () {
    function InclusionesDetailsComComponent(_route, _location, _inclusionService, _cursesService, _studentsService, _usersService, _settingsService, _notifications) {
        this._route = _route;
        this._location = _location;
        this._inclusionService = _inclusionService;
        this._cursesService = _cursesService;
        this._studentsService = _studentsService;
        this._usersService = _usersService;
        this._settingsService = _settingsService;
        this._notifications = _notifications;
        this.cursesDetails = []; // Details of the curses of the current semester
        this.allSchools = []; // Details of the curses of the current semester
    }
    InclusionesDetailsComComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._usersService.getAllComUsersRoles().subscribe(// get the status
        function (// get the status
            resp) {
            var listTem = [];
            for (var i = 0; i < resp.length; ++i) {
                if (resp[i].system == 1) {
                    listTem.push(resp[i]);
                }
            }
            _this.rolesList = listTem; // assign to the local object        
        });
        this._settingsService.getStatusServices().subscribe(// get the status
        function (// get the status
            resp) {
            _this.statusList = resp; // assign to the local object        
        });
        this.inclusionSubscribe = this._route.params.subscribe(function (params) {
            _this.inclusionId = params['inclusionID']; // get the id
            _this.inclusionDetails = {
                "telefono": 0, "promedio_general": 0, "cita_matricula": "00/00/0000",
                "curso": "Default", "grupo": 0, "profesor": 0, "periodo": "Default",
                "fecha_solicitud": "", "id": 0, "estudiante": 0,
                "observacion_solicitud": "", "estado": "",
                "encargado_solicitud": "", "requiere_proceso": "",
                "carta": "", "se_requiere": "", "se_requiere_tipo": ""
            }; // sacar del estudiante con el atributo id de estudiante: nombre, correo, carnet
            _this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };
            _this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };
            _this._settingsService.getStatusServices().subscribe(// get the status
            function (// get the status
                resp) {
                _this.statusList = resp; // assign to the local object        
            });
            _this.reqDetails = { "type": "", "cursos": { "escuelas": { "nombre": "" }, "nombre": "", "codigo": "" } };
            _this.periodList = { "anno": "", "semestre": "" };
            _this._inclusionService.getByID(_this.inclusionId).subscribe(// get the details
            function (// get the details
                resp) {
                _this.inclusionDetails = resp; // assign to the local object
                _this._inclusionService.getReq(_this.inclusionDetails.id).subscribe(// get the details
                function (// get the details
                    resp) {
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
                    _this.periodList = resp; // assign to the local object        
                });
                _this._cursesService.getAllSchools().subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.allSchools = resp; // assign to the local object 
                });
                _this._studentsService.getByID(_this.inclusionDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.studentDetails = resp; // assign to the local object        
                });
                _this._cursesService.getByCurriStudent(_this.inclusionDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.cursesDetails = resp; // assign to the local object        
                    var i = 0;
                    console.log("EL SEMESTRE s");
                    console.log(resp);
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
                    _this.cursoSolicitaDetails = resp; // assign to the local object        
                });
            });
        });
    };
    /**
     * Do somethings after init
     */
    InclusionesDetailsComComponent.prototype.ngAfterViewInit = function () {
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    };
    InclusionesDetailsComComponent.prototype.searchPosSchool = function (id) {
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
    InclusionesDetailsComComponent.prototype.ngOnDestroy = function () {
        this.inclusionSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    InclusionesDetailsComComponent.prototype.navigateToParent = function () {
        this._location.back();
    };
    ;
    InclusionesDetailsComComponent.prototype.updateData = function () {
        var _this = this;
        var req = {
            "estado_solicitud": this.inclusionDetails.estado, "memo_solicitud": this.inclusionDetails.memo_solicitud, "sesion_solicitud": this.inclusionDetails.sesion_solicitud,
            "encargado_solicitud": ng2_cookies_1.Cookie.get('idUser'), "observacion_solicitud": this.inclusionDetails.observacion_solicitud, "requiere_proceso": this.inclusionDetails.requiere_proceso
        };
        // console.log("upppupupupup");
        // console.log(req);
        this._inclusionService.editAnInclusion(this.inclusionDetails.id, req).subscribe(// get the details
        function (// get the details
            resp) {
            console.log(resp);
            if (resp == 'Objeto cambiado') {
                var obj = {
                    "visto": false,
                    "tipo": "Mensaje del Sistema CE con respecta a una inclusión",
                    "fecha": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
                    "correo_electronico": _this.inclusionDetails.correo_electronico,
                    "descripcion": "Su solicitud respecto a una inclusión ha sido modificada, el estado es " + req.estado_solicitud // cuerpo
                };
                console.log(obj);
                _this._notifications.createEmail(obj).subscribe(function (resp) {
                    console.log(resp);
                });
                swal({
                    title: 'Mensaje',
                    text: "Se van a realizar los cambios",
                    type: 'success',
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    buttonsStyling: false
                });
            }
            else {
                swal({
                    title: 'Mensaje',
                    text: "Se produjo un error, no se realizaran los cambios ",
                    type: 'warning',
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    buttonsStyling: false
                });
            }
        });
    };
    InclusionesDetailsComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Com-cmp',
            templateUrl: 'inclusionDetails.component.html',
            providers: [inclusions_service_1.InclusionsService, curses_service_1.CursesService, students_service_1.StudentsService, users_service_1.UsersService, settings_service_1.SettingsService, notifications_service_1.NotificationsService] // the provider of inclusions
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, inclusions_service_1.InclusionsService, curses_service_1.CursesService, students_service_1.StudentsService, users_service_1.UsersService, settings_service_1.SettingsService, notifications_service_1.NotificationsService])
    ], InclusionesDetailsComComponent);
    return InclusionesDetailsComComponent;
}());
exports.InclusionesDetailsComComponent = InclusionesDetailsComComponent;
//# sourceMappingURL=inclusionDetails.component.js.map