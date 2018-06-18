import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InclusionsService } from '../../services/inclusions.service';
import { CursesService } from '../../services/curses.service';
import { StudentsService } from '../../services/students.service';
import { UsersService } from '../../services/users.service';
import { SettingsService } from '../../services/settings.service';

declare var $: any;
declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Com-cmp',
    templateUrl: 'inclusionDetails.component.html',
    providers: [InclusionsService, CursesService, StudentsService, UsersService, SettingsService] // the provider of inclusions
})

export class InclusionesDetailsComComponent implements OnInit, OnDestroy {

    private inclusionId: string;             // The id of the inclusion to search
    private inclusionSubscribe: any;         // The subscribe for get the params of the route
    private inclusionDetails: any;           // Details of the inclusion
    private studentDetails: any;           // Details of the student
    private cursoSolicitaDetails: any;           // Details of the curse
    private reqDetails: any;           // Details of the req
    private cursesDetails = [];           // Details of the curses of the current semester
    private allSchools = [];           // Details of the curses of the current semester
    private statusList: any;                // Types of status
    private rolesList: any;                // Types of roles
    private periodList: any;                // Periods


    constructor(private _route: ActivatedRoute, private _location: Location, private _inclusionService: InclusionsService,
        private _cursesService: CursesService, private _studentsService: StudentsService, private _usersService: UsersService, private _settingsService: SettingsService) { }

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


        this.inclusionSubscribe = this._route.params.subscribe(params => {
            this.inclusionId = params['inclusionID']; // get the id

            this.inclusionDetails = { // Default object to use in the html in a temporaly way 
                "telefono": 0, "promedio_general": 0, "cita_matricula": "00/00/0000",
                "curso": "Default", "grupo": 0, "profesor": 0, "periodo": "Default",
                "fecha_solicitud": "", "id": 0, "estudiante": 0,

                "observacion_solicitud": "", "estado": "",
                "encargado_solicitud": "", "requiere_proceso": "",
                "carta": "", "se_requiere": "", "se_requiere_tipo": ""
            }; // sacar del estudiante con el atributo id de estudiante: nombre, correo, carnet

            this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };

            this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };

            this._settingsService.getStatusServices().subscribe(  // get the status
                resp => {
                    this.statusList = resp; // assign to the local object        
                }
            );


            this.reqDetails = { "type": "", "cursos": { "escuelas": { "nombre": "" }, "nombre": "", "codigo": "" } };

            this.periodList = { "anno": "", "semestre": "" };

            this._inclusionService.getByID(this.inclusionId).subscribe(  // get the details
                resp => {

                    this.inclusionDetails = resp; // assign to the local object


                    this._inclusionService.getReq(this.inclusionDetails.id).subscribe(  // get the details
                        resp => {
                            if (resp.type == 'req') {
                                this.reqDetails = resp.lc; // assign to the local object        
                                this.reqDetails.type = 'Levantamiento de requisito'; // assign to the local object        
                            }
                            if (resp.type == 'reqRN') {
                                this.reqDetails = resp.lrn; // assign to the local object       
                                this.reqDetails.type = 'Levantamiento de requisito RN'; // assign to the local object    
                            }
                        }
                    );


                    this._settingsService.getPeriodById(resp.periodo).subscribe(  // get the status
                        resp => {
                            this.periodList = resp; // assign to the local object        
                        }
                    );

                    this._cursesService.getAllSchools().subscribe(  // get the details
                        resp => {
                            this.allSchools = resp; // assign to the local object 
                        }
                    );

                    this._studentsService.getByID(this.inclusionDetails.estudiante).subscribe(  // get the details
                        resp => {
                            this.studentDetails = resp; // assign to the local object        
                        }
                    );

                    this._cursesService.getByCurriStudent(this.inclusionDetails.estudiante).subscribe(  // get the details
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

                    this._cursesService.getByID(this.inclusionDetails.curso).subscribe(  // get the details
                        resp => {

                            this.cursoSolicitaDetails = resp; // assign to the local object        
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
            if (id == this.allSchools[i].codigo) {
                pos = i;
                break;
            } else {
                i++;
            }
        }
        return pos;
    }



    ngOnDestroy() {
        this.inclusionSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };

    /**
     * Used to navigate to the principal page of inclusions
     */
    navigateToParent() {
        this._location.back();
    };

    updateData() {

        var req = {
            "estado_solicitud": this.inclusionDetails.estado, "memo_solicitud": this.inclusionDetails.memo_solicitud, "sesion_solicitud": this.inclusionDetails.sesion_solicitud,
            "encargado_solicitud": 1, "observacion_solicitud": this.inclusionDetails.observacion_solicitud, "requiere_proceso": this.inclusionDetails.requiere_proceso
        };
        // console.log("upppupupupup");
        // console.log(req);
        this._inclusionService.editAnInclusion(this.inclusionDetails.id, req).subscribe(  // get the details
            resp => {
                console.log(resp);
                if (resp == 'Objeto cambiado') {

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