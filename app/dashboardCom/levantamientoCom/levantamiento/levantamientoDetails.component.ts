import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LevantamientoService } from '../../services/levantamiento.service';
import { CursesService } from '../../services/curses.service';
import { StudentsService } from '../../services/students.service';
import { SettingsService } from '../../services/settings.service';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service'; 
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $: any;
declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Com-cmp',
    templateUrl: 'levantamientoDetails.component.html',
    providers: [LevantamientoService, CursesService, StudentsService, SettingsService, UsersService, NotificationsService] // the provider of levantamiento
})

export class LevantamientoDetailsComComponent implements OnInit, OnDestroy {

    private levantamientoId: string;             // The id of the request to search
    private requestSubscribe: any;         // The subscribe for get the params of the route
    private requestDetails: any;           // Details of the request
    private studentDetails: any;           // Details of the student
    private cursoSolicitaDetails: any;           // Details of the curse
    private cursoSolicitaDetailsMat: any;           // Details of the curses of the current semester
    private cursesDetails = [];           // Details of the curses of the current semester
    private allSchools = [];           // Details of the curses of the current semester
    private statusList: any;                // Types of status
    private rolesList: any;                // Types of roles
    private periodList: any;                // Periods

    private editingData = { "state": "", "revBy": 0, "reqP": "", "obse": "" };

    constructor(private _route: ActivatedRoute, private _location: Location, private _requestService: LevantamientoService,
        private _cursesService: CursesService, private _studentsService: StudentsService, private _settingsService: SettingsService, 
        private _usersService: UsersService, private _notifications: NotificationsService) { }
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
            this.levantamientoId = params['levantamientoId']; // get the id

            this.requestDetails = // Default object to use in the html in a temporaly way 
                {
                    "telefono": 0, "promedio_general": 0, "promedio_general_anterior": 0,
                    "estudiante": 0, "curso": 0,
                    "periodo": "",

                    "fecha_solicitud": "",
                    "id": 0, "observacion_solicitud": "", "estado": "",
                    "encargado_solicitud": "", "requiere_proceso": "",
                    "carta": "", "se_requiere": 0, "se_requiere_tipo": 0
                }; // sacar del estudiante con el atributo id de estudiante: nombre, correo, carnet

            this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };

            this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };

            this.cursoSolicitaDetailsMat = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };

            this.periodList = { "anno": "", "semestre": "" };

            this._cursesService.getAllSchools().subscribe(  // get the details
                resp => {
                    this.allSchools = resp; // assign to the local object 
                }
            );



            this._settingsService.getStatusServices().subscribe(  // get the status
                resp => {
                    this.statusList = resp; // assign to the local object        
                }
            );


            this._requestService.getByID(this.levantamientoId).subscribe(  // get the details
                resp => {

                    this.requestDetails = resp; // assign to the local object

                    this._settingsService.getPeriodById(resp.periodo).subscribe(  // get the status
                        resp => {
                            this.periodList = resp; // assign to the local object        
                        }
                    );

                    this._studentsService.getByID(this.requestDetails.estudiante).subscribe(  // get the details
                        resp => {
                            this.studentDetails = resp; // assign to the local object        
                        }
                    );

                    this._cursesService.getByCurriStudent(this.requestDetails.estudiante).subscribe(  // get the details
                        resp => {
                            this.cursesDetails = resp; // assign to the local object   
                            var i = 0;
                            while (i < resp.length) {
                                var temInd = this.searchPosSchool(resp[i].id);

                                if (temInd == -1) {
                                    this.cursesDetails[i].escuela = "No definida";
                                } else {
                                    this.cursesDetails[i].escuela = this.allSchools[temInd].nombre;
                                }
                                i++;
                            }
                        }
                    );

                    this._cursesService.getByID(this.requestDetails.curso_levantar).subscribe(  // get the details
                        resp => {

                            this.cursoSolicitaDetails = resp; // assign to the local object        
                        }
                    );

                    this._cursesService.getByID(this.requestDetails.curso_matricular).subscribe(  // get the details
                        resp => {
                            this.cursoSolicitaDetailsMat = resp; // assign to the local object        
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

    searchPosSchool(id): number {
        var i = 0;
        var pos = -1;
        while (i < this.allSchools.length) {
            if (id == this.allSchools[i].id) {
                pos = i;
                break;
            } else {
                i++;
            }
        }
        return pos;
    }

    ngOnDestroy() {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };

    /**
     * Used to navigate to the principal page of inclusions
     */
    navigateToParent() {
        this._location.back();
    };

    updateData() {

        var req = {
            "estado_solicitud": this.requestDetails.estado, "memo_solicitud": this.requestDetails.memo_solicitud, "sesion_solicitud": this.requestDetails.sesion_solicitud,
            "encargado_solicitud": Cookie.get('idUser'), "observacion_solicitud": this.requestDetails.observacion_solicitud, "requiere_proceso": this.requestDetails.requiere_proceso
        };
        // console.log("upppupupupup");
        // console.log(req);
        this._requestService.editAReq(this.requestDetails.id, req).subscribe(  // get the details
            resp => {
                console.log(resp);
                if (resp == 'Objeto modificado') {

                    var obj = {
                        "visto": false,
                        "tipo": "Mensaje del Sistema CE con respecta a una apelación", // asunto
                        "fecha": new Date(),
                        "correo_electronico": this.requestDetails.correo_electronico, // correo al q le voy a mandar
                        "descripcion": "Su apelación respecto a un levantamiento de requisito ha sido modificada, el estado es "+ req.estado_solicitud// cuerpo
                    };

                    console.log(obj);

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