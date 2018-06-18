import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; //private _location: Location,
import { InclusionsService } from '../../services/inclusions.service';
import { CursesService } from '../../services/curses.service';
import { StudentsService } from '../../services/students.service';
import { SettingsService } from '../../services/settings.service';



@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Admin-cmp',
    templateUrl: 'inclusionDetails.component.html',
    providers: [InclusionsService, CursesService, StudentsService, SettingsService] // the provider of inclusions
})

export class InclusionesDetailsAdminComponent implements OnInit, OnDestroy {

    private inclusionId: string;             // The id of the inclusion to search
    private inclusionSubscribe: any;         // The subscribe for get the params of the route
    private inclusionDetails: any;           // Details of the inclusion
    private studentDetails: any;           // Details of the student
    private cursoSolicitaDetails: any;           // Details of the curse
    private reqDetails: any;           // Details of the req
    private cursesDetails = [];           // Details of the curses of the current semester
    private allSchools = [];           // Details of the curses of the current semester
    private periodList: any;                // Periods

    constructor(private _route: ActivatedRoute, private _location: Location, private _inclusionService: InclusionsService,
        private _cursesService: CursesService, private _studentsService: StudentsService, private _settingsService: SettingsService) { }

    ngOnInit(): any {
        this.inclusionSubscribe = this._route.params.subscribe(params => {
            this.inclusionId = params['inclusionID']; // get the id
            this.inclusionDetails = { // Default object to use in the html in a temporaly way 
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

            this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };

            this.cursoSolicitaDetails = {
                "id": 0, "codigo": "", "nombre": "", "creditos": 0, "escuela": ""
            };

            this.reqDetails = { "type": "", "cursos": { "escuelas": { "nombre": "" }, "nombre": "", "codigo": "" } };

            this.periodList = { "anno": "", "semestre": "" };


            this._inclusionService.getByID(this.inclusionId).subscribe(  // get the details
                resp => {


                    this.inclusionDetails = resp; // assign to the local object
                    // console.log(resp);
                    // console.log('El req de la inclusion');
                    // console.log(resp);
                    // console.log('Eso seria');
                    this._inclusionService.getReq(this.inclusionDetails.id).subscribe(  // get the details
                        resp => {
                            // console.log('El req de todos los relacionados');
                            // console.log(resp);
                            // console.log(resp.lc);
                            // console.log('Eso seria');

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
                            // console.log('El req de periodo');
                            // console.log(resp);
                            // console.log('Eso seria');
                            this.periodList = resp; // assign to the local object   
                        }
                    );


                    this._cursesService.getAllSchools().subscribe(  // get the details
                        resp => {
                            // console.log('El req schools');
                            // console.log(resp);
                            // console.log('Eso seria');
                            this.allSchools = resp; // assign to the local object   
                        }
                    );

                    this._studentsService.getByID(this.inclusionDetails.estudiante).subscribe(  // get the details
                        resp => {
                            // console.log('El req de estudiante');
                            // console.log(this.inclusionDetails.estudiante);
                            // console.log(resp);
                            // console.log('Eso seria');
                            this.studentDetails = resp; // assign to the local object    
                        }
                    );

                    this._cursesService.getByCurriStudent(this.inclusionDetails.estudiante).subscribe(  // get the details
                        resp => {

                            this.cursesDetails = resp; // assign to the local object        
                            var i = 0;
                            // console.log('El req de los cursos del semestre');
                            // console.log(resp);
                            // console.log('Eso seria');

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
                            // console.log('El req by id del curso');
                            // console.log(resp);
                            // console.log('Eso seria');

                            this.cursoSolicitaDetails = resp; // assign to the local object    
                        }
                    );
                }
            );
        });
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

}