import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppealsService } from '../../services/appeals.service';
import { StudentsService } from '../../services/students.service';
import { SettingsService } from '../../services/settings.service';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service'; // private _notifications: NotificationsService
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $: any;
declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Com-cmp',
    templateUrl: 'apelacionDetails.component.html',
    providers: [AppealsService, StudentsService, SettingsService, UsersService, NotificationsService] // the provider of apelacion
})

export class ApelacionDetailsComComponent implements OnInit, OnDestroy {

    private apelacionId: string;             // The id of the request to search
    private requestSubscribe: any;         // The subscribe for get the params of the route
    private requestDetails: any;           // Details of the request
    private studentDetails: any;           // Details of the student
    private statusList: any;                // Types of status
    private rolesList: any;                // Types of roles
    private periodList: any;                // Periods
    private apelacionTipo: any;

    constructor(private _route: ActivatedRoute, private _router: Router, private _requestService: AppealsService,
        private _studentsService: StudentsService, private _settingsService: SettingsService, private _usersService: UsersService, private _notifications: NotificationsService) { }

    ngOnInit(): any {

        this._usersService.getAllComUsersRoles().subscribe(  // get the status
            resp => {
                var listTem = [];

                for (var i = 0; i < resp.length; ++i) {
                    if (resp[i].system == 1) {
                        listTem.push(resp[i]);
                    }
                }

                this.rolesList = listTem; // assign to the local object        
            }
        );

        this._settingsService.getStatusServices().subscribe(  // get the status
            resp => {
                this.statusList = resp; // assign to the local object        
            }
        );



        this.requestSubscribe = this._route.params.subscribe(params => {
            this.apelacionId = params['apelacionId']; // get the id
            this.apelacionTipo = params['apelaTipo']; // get the tipo

            this.requestDetails = // Default object to use in the html in a temporaly way 
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



            this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };

            this.periodList = { "anno": "", "semestre": "" };

            this._requestService.getByID(this.apelacionId, this.apelacionTipo).subscribe(  // get the details
                resp => {
                    this.requestDetails = resp; // assign to the local object
                    this._studentsService.getByID(this.requestDetails.estudiante).subscribe(  // get the details
                        resp => {
                            this.studentDetails = resp; // assign to the local object        
                        }
                    );

                    this._settingsService.getPeriodById(resp.periodo).subscribe(  // get the status
                        resp => {
                            this.periodList = resp; // assign to the local object        
                        }
                    );

                }
            );
        });
    }

    /**
     * Do somethings after init
     */
    ngAfterViewInit() {
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    }


    ngOnDestroy() {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };

    /**
     * Used to navigate to the principal page of inclusions
     */
    navigateToParent() {
        this._router.navigate(['com/apelacion']);
    };

    updateData() {

        var req = {
            "estado_apelacion": this.requestDetails.estado_apelacion, "memo_apelacion": this.requestDetails.memo_solicitud, "sesion_apelacion": this.requestDetails.sesion_solicitud,
            "encargado_apelacion": Cookie.get('idUser'), "observacion_apelacion": this.requestDetails.observacion_solicitud, "requiere_proceso": this.requestDetails.requiere_proceso
        };
        // console.log("upppupupupup");
        // console.log(req);
        this._requestService.editAppeal(this.requestDetails.id, this.apelacionTipo, req).subscribe(  // get the details
            resp => {
                console.log(resp);
                if (resp == 'Objeto cambiado') {

                    var obj = {
                        "visto": false,
                        "tipo": "Mensaje del Sistema CE con respecta a una apelación", // asunto
                        "fecha": new Date(),
                        "correo_electronico": this.requestDetails.correo_electronico, // correo al q le voy a mandar
                        "descripcion": "Su apelación respecto a "+this.apelacionTipo+" ha sido modificada, el estado es "+ req.estado_apelacion// cuerpo
                    };

                    this._notifications.createEmail(obj).subscribe(resp => {
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

                } else {
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


            }
        );
    }
}