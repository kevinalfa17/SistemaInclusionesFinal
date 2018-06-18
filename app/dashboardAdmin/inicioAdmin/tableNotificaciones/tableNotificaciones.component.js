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
var notifications_service_1 = require('../../services/notifications.service');
var students_service_1 = require('../../services/students.service');
var TableNotificacionesComponent = (function () {
    function TableNotificacionesComponent(_route, _router, _notificationService, _studentsService) {
        this._route = _route;
        this._router = _router;
        this._notificationService = _notificationService;
        this._studentsService = _studentsService;
        this.principalListNotifications = [];
        this.numberInclusions = 0; // Variable for the number of pending or new inclusions
        this.numberLiftingRequirements = 0; // Variable for the number of pending or new lifting requirements
        this.numberLiftingRequirementsRN = 0; // Variable for the number of pending or new lifting requirements RN
        this.numberAppeals = 0; // Variable for the list of pending or new appeal
        this.listInclusions = []; // Variable for the list of pending or new inclusions
        this.listLiftingRequirements = []; // Variable for the list of pending or new lifting requirements
        this.listLiftingRequirementsRN = []; // Variable for the list of pending or new lifting requirements RN
        this.listAppeals = []; // Variable for the list of pending or new appeals
    }
    TableNotificacionesComponent.prototype.ngOnInit = function () {
        // this._notificationService.getAll().subscribe(resp => {
        //     this.principalListNotifications = resp;
        //     this.divideNotificationsType(this.principalListNotifications); // constructor for check changes in the list of notifications
        // });
    };
    /**
     * This function it's used to organize the list of notifications from the server and divide the diferent types
     * @param list the list to
     */
    TableNotificacionesComponent.prototype.divideNotificationsType = function (list) {
        var _this = this;
        for (var i = 0; i < list.length; ++i) {
            var In = { "id": 0, "tipo": "inc", "estudiante": "", "descripcion": "", "leido": false, "idService": 0 };
            switch (list[i].tipo) {
                case 'inc': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(function (resp) {
                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        _this.listInclusions.push(In);
                    });
                    if (list[i].leido == false) {
                        this.numberInclusions = this.numberInclusions + 1;
                    }
                    break;
                }
                case 'ape': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(function (resp) {
                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        _this.listAppeals.push(In);
                    });
                    if (list[i].leido == false) {
                        this.numberAppeals = this.numberAppeals + 1;
                    }
                    break;
                }
                case 'req': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(function (resp) {
                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        _this.listLiftingRequirements.push(In);
                    });
                    if (list[i].leido == false) {
                        this.numberLiftingRequirements = this.numberLiftingRequirements + 1;
                    }
                    break;
                }
                case 'reqRN': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(function (resp) {
                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        _this.listLiftingRequirementsRN.push(In);
                        //console.log(this.listLiftingRequirementsRN[0]);
                    });
                    if (list[i].leido == false) {
                        this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN + 1;
                    }
                    break;
                }
                default: {
                    //statements; 
                    break;
                }
            }
        }
    };
    /**
     * This function it's used to change the state (read or not) of a specific notification and synchronize it with the API
     * @param noti The object of the notification
     */
    TableNotificacionesComponent.prototype.changeCheckboxData = function (notiID, state, tipo, index) {
        //console.log(notiID, state, tipo, index);
        if (tipo == 'inc') {
            if (state == true) {
                this.numberInclusions = this.numberInclusions - 1;
            }
            else {
                this.numberInclusions = this.numberInclusions + 1;
            }
            this.listInclusions[index].leido = state;
        }
        else if (tipo == 'req') {
            if (state == true) {
                this.numberLiftingRequirements = this.numberLiftingRequirements - 1;
            }
            else {
                this.numberLiftingRequirements = this.numberLiftingRequirements + 1;
            }
            this.listLiftingRequirements[index].leido = state;
        }
        else if (tipo == 'reqRN') {
            if (state == true) {
                this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN - 1;
            }
            else {
                this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN + 1;
            }
            this.listLiftingRequirementsRN[index].leido = state;
        }
        else if (tipo == 'ape') {
            if (state == true) {
                this.numberAppeals = this.numberAppeals - 1;
            }
            else {
                this.numberAppeals = this.numberAppeals + 1;
            }
            this.listAppeals[index].leido = state;
        }
        this._notificationService.changeState(notiID, state);
    };
    /**
     * It's used to redirect the messages to their principal menu
     * @param noti The object of the notification
     */
    TableNotificacionesComponent.prototype.redirectNotification = function (noti) {
        //this._router.navigate(['admin/levantamiento']);
        console.log("Ir por " + noti.id + " de tipo " + noti.tipo);
        if (noti.tipo == 'inc') {
            this._router.navigate(['admin/inclusiones/' + noti.id]);
        }
        else if (noti.tipo == 'req') {
            this._router.navigate(['admin/levantamiento/' + noti.id]);
        }
        else if (noti.tipo == 'reqRN') {
            this._router.navigate(['admin/levantamientoRN/' + noti.id]);
        }
        else if (noti.tipo == 'ape') {
            var apTip = "Inclusión";
            if (noti.tipo == "req") {
                var apTip = "Levantamiento Requisito";
            }
            if (noti.tipo == "reqRN") {
                var apTip = "Levantamiento Requisito RN";
            }
            this._router.navigate(['admin/apelacion/' + noti.id + "/" + apTip]);
        }
        // crear varios de acuerdo al tipo para redireccionar desde inicio 
    };
    /**
     * This function it's used to delete a specific notification and synchronize it with the API
     * @param noti
     */
    TableNotificacionesComponent.prototype.deleteNotification = function (notiID, tipo, index) {
        //console.log(notiID, tipo, index);
        if (tipo == 'inc') {
            this.numberInclusions = this.numberInclusions - 1;
            this.listInclusions.splice(index, 1);
        }
        else if (tipo == 'req') {
            this.numberLiftingRequirements = this.numberLiftingRequirements - 1;
            this.listLiftingRequirements.splice(index, 1);
        }
        else if (tipo == 'reqRN') {
            this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN - 1;
            this.listLiftingRequirementsRN.splice(index, 1);
        }
        else if (tipo == 'ape') {
            this.numberAppeals = this.numberAppeals - 1;
            this.listAppeals.splice(index, 1);
        }
        this._notificationService.deleteByID(notiID);
    };
    TableNotificacionesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-Notificaciones-Admin-cmp',
            templateUrl: 'tableNotificaciones.component.html',
            providers: [notifications_service_1.NotificationsService, students_service_1.StudentsService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, notifications_service_1.NotificationsService, students_service_1.StudentsService])
    ], TableNotificacionesComponent);
    return TableNotificacionesComponent;
}());
exports.TableNotificacionesComponent = TableNotificacionesComponent;
//# sourceMappingURL=tableNotificaciones.component.js.map