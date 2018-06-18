import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service'
import { StudentsService } from '../../services/students.service'

@Component({
    moduleId: module.id,
    selector: 'table-Notificaciones-Admin-cmp',
    templateUrl: 'tableNotificaciones.component.html',
    providers: [NotificationsService, StudentsService]
})

export class TableNotificacionesComponent implements OnInit {
    principalListNotifications = [];
    numberInclusions = 0; // Variable for the number of pending or new inclusions
    numberLiftingRequirements = 0; // Variable for the number of pending or new lifting requirements
    numberLiftingRequirementsRN = 0; // Variable for the number of pending or new lifting requirements RN
    numberAppeals = 0; // Variable for the list of pending or new appeal
    listInclusions = []; // Variable for the list of pending or new inclusions
    listLiftingRequirements = []; // Variable for the list of pending or new lifting requirements
    listLiftingRequirementsRN = []; // Variable for the list of pending or new lifting requirements RN
    listAppeals = []; // Variable for the list of pending or new appeals


    constructor(private _route: ActivatedRoute, private _router: Router, private _notificationService: NotificationsService, private _studentsService: StudentsService) { }

    ngOnInit() {

        // this._notificationService.getAll().subscribe(resp => {
        //     this.principalListNotifications = resp;
        //     this.divideNotificationsType(this.principalListNotifications); // constructor for check changes in the list of notifications
        // });


    }

    /**
     * This function it's used to organize the list of notifications from the server and divide the diferent types
     * @param list the list to 
     */
    divideNotificationsType(list) {

        for (var i = 0; i < list.length; ++i) {
            var In = { "id": 0, "tipo": "inc", "estudiante": "", "descripcion": "", "leido": false, "idService": 0 };

            switch (list[i].tipo) { // A case to divide the differents types of notifications
                case 'inc': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(resp => {

                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        this.listInclusions.push(In);

                    });

                    if (list[i].leido == false) {
                        this.numberInclusions = this.numberInclusions + 1;
                    }
                    break;
                }
                case 'ape': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(resp => {

                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        this.listAppeals.push(In);
                    });

                    if (list[i].leido == false) {
                        this.numberAppeals = this.numberAppeals + 1;
                    }
                    break;
                }
                case 'req': {
                    this._studentsService.getByID(list[i].estudiante).subscribe(resp => {

                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;
                        this.listLiftingRequirements.push(In);


                    });

                    if (list[i].leido == false) {
                        this.numberLiftingRequirements = this.numberLiftingRequirements + 1;
                    }
                    break;

                }
                case 'reqRN': {


                    this._studentsService.getByID(list[i].estudiante).subscribe(resp => {

                        In.id = list[i].id;
                        In.tipo = list[i].tipo;
                        In.descripcion = list[i].descripcion;
                        In.leido = list[i].leido;
                        In.idService = list[i].idService;
                        In.estudiante = resp.primer_nombre + " " + resp.segundo_nombre + " " + resp.primer_apellido + " " + resp.segundo_apellido;

                        this.listLiftingRequirementsRN.push(In);

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
    }

    /**
     * This function it's used to change the state (read or not) of a specific notification and synchronize it with the API  
     * @param noti The object of the notification
     */
    changeCheckboxData(notiID, state, tipo, index) {
        //console.log(notiID, state, tipo, index);
        if (tipo == 'inc') {
            if (state == true) {
                this.numberInclusions = this.numberInclusions - 1;
            } else {
                this.numberInclusions = this.numberInclusions + 1;
            }
            this.listInclusions[index].leido = state;

        } else if (tipo == 'req') {
            if (state == true) {
                this.numberLiftingRequirements = this.numberLiftingRequirements - 1;
            } else {
                this.numberLiftingRequirements = this.numberLiftingRequirements + 1;
            }
            this.listLiftingRequirements[index].leido = state;

        } else if (tipo == 'reqRN') {
            if (state == true) {
                this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN - 1;
            } else {
                this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN + 1;
            }
            this.listLiftingRequirementsRN[index].leido = state;

        } else if (tipo == 'ape') {
            if (state == true) {
                this.numberAppeals = this.numberAppeals - 1;
            } else {
                this.numberAppeals = this.numberAppeals + 1;
            }
            this.listAppeals[index].leido = state;

        }
        this._notificationService.changeState(notiID, state);
    }

    /**
     * It's used to redirect the messages to their principal menu 
     * @param noti The object of the notification
     */
    redirectNotification(noti) {
        //this._router.navigate(['admin/levantamiento']);

        console.log("Ir por " + noti.id + " de tipo " + noti.tipo);
        if (noti.tipo == 'inc') {
            this._router.navigate(['admin/inclusiones/' + noti.id]);
        }
        else if (noti.tipo == 'req') {
            this._router.navigate(['admin/levantamiento/' + noti.id]);
        } else if (noti.tipo == 'reqRN') {
            this._router.navigate(['admin/levantamientoRN/' + noti.id]);
        } else if (noti.tipo == 'ape') {
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
    }

    /**
     * This function it's used to delete a specific notification and synchronize it with the API 
     * @param noti
     */
    deleteNotification(notiID, tipo, index) {

        //console.log(notiID, tipo, index);
        if (tipo == 'inc') {

            this.numberInclusions = this.numberInclusions - 1;

            this.listInclusions.splice(index, 1);

        } else if (tipo == 'req') {

            this.numberLiftingRequirements = this.numberLiftingRequirements - 1;
            this.listLiftingRequirements.splice(index, 1);

        } else if (tipo == 'reqRN') {

            this.numberLiftingRequirementsRN = this.numberLiftingRequirementsRN - 1;
            this.listLiftingRequirementsRN.splice(index, 1);

        } else if (tipo == 'ape') {

            this.numberAppeals = this.numberAppeals - 1;
            this.listAppeals.splice(index, 1);

        }

        this._notificationService.deleteByID(notiID);
    }

}
