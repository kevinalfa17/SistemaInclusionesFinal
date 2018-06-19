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
var users_service_1 = require('../../services/users.service');
var notifications_service_1 = require('../../services/notifications.service'); // private _notifications: NotificationsService
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var ApelacionDetailsComComponent = (function () {
    function ApelacionDetailsComComponent(_route, _router, _requestService, _studentsService, _settingsService, _usersService, _notifications) {
        this._route = _route;
        this._router = _router;
        this._requestService = _requestService;
        this._studentsService = _studentsService;
        this._settingsService = _settingsService;
        this._usersService = _usersService;
        this._notifications = _notifications;
    }
    ApelacionDetailsComComponent.prototype.ngOnInit = function () {
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
        this.requestSubscribe = this._route.params.subscribe(function (params) {
            _this.apelacionId = params['apelacionId']; // get the id
            _this.apelacionTipo = params['apelaTipo']; // get the tipo
            _this.requestDetails =
                {
                    "id": 0,
                    "estudiante": 0, "servicioID": 0, "tipo": "",
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
                _this.requestDetails = resp; // assign to the local object
                _this._studentsService.getByID(_this.requestDetails.estudiante).subscribe(// get the details
                function (// get the details
                    resp) {
                    _this.studentDetails = resp; // assign to the local object        
                });
                _this._settingsService.getPeriodById(resp.periodo).subscribe(// get the status
                function (// get the status
                    resp) {
                    _this.periodList = resp; // assign to the local object        
                });
            });
        });
    };
    /**
     * Do somethings after init
     */
    ApelacionDetailsComComponent.prototype.ngAfterViewInit = function () {
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    };
    ApelacionDetailsComComponent.prototype.ngOnDestroy = function () {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };
    ;
    /**
     * Used to navigate to the principal page of inclusions
     */
    ApelacionDetailsComComponent.prototype.navigateToParent = function () {
        this._router.navigate(['com/apelacion']);
    };
    ;
    ApelacionDetailsComComponent.prototype.updateData = function () {
        var _this = this;
        var req = {
            "estado_apelacion": this.requestDetails.estado_apelacion, "memo_apelacion": this.requestDetails.memo_solicitud, "sesion_apelacion": this.requestDetails.sesion_solicitud,
            "encargado_apelacion": ng2_cookies_1.Cookie.get('idUser'), "observacion_apelacion": this.requestDetails.observacion_solicitud, "requiere_proceso": this.requestDetails.requiere_proceso
        };
        // console.log("upppupupupup");
        // console.log(req);
        this._requestService.editAppeal(this.requestDetails.id, this.apelacionTipo, req).subscribe(// get the details
        function (// get the details
            resp) {
            console.log(resp);
            if (resp == 'Objeto cambiado') {
                var obj = {
                    "visto": false,
                    "tipo": "Mensaje del Sistema CE con respecta a una apelación",
                    "fecha": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
                    "correo_electronico": _this.requestDetails.correo_electronico,
                    "descripcion": "Su solicitud respecto a " + _this.apelacionTipo + " ha sido modificada, el estado es " + req.estado_apelacion // cuerpo
                };
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
    ApelacionDetailsComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'details-Inclusion-Com-cmp',
            templateUrl: 'apelacionDetails.component.html',
            providers: [appeals_service_1.AppealsService, students_service_1.StudentsService, settings_service_1.SettingsService, users_service_1.UsersService, notifications_service_1.NotificationsService] // the provider of apelacion
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, appeals_service_1.AppealsService, students_service_1.StudentsService, settings_service_1.SettingsService, users_service_1.UsersService, notifications_service_1.NotificationsService])
    ], ApelacionDetailsComComponent);
    return ApelacionDetailsComComponent;
}());
exports.ApelacionDetailsComComponent = ApelacionDetailsComComponent;
//# sourceMappingURL=apelacionDetails.component.js.map