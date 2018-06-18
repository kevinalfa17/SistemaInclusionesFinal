import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LevantamientoService } from '../../services/levantamiento.service';
import { CursesService } from '../../services/curses.service';
import { StudentsService } from '../../services/students.service';
import { SettingsService } from '../../services/settings.service';


@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Admin-cmp',
    templateUrl: 'levantamientoDetails.component.html',
    providers: [LevantamientoService, CursesService, StudentsService, SettingsService] // the provider of levantamiento
})

export class LevantamientoDetailsAdminComponent implements OnInit, OnDestroy {

    private levantamientoId: string;             // The id of the request to search
    private requestSubscribe: any;         // The subscribe for get the params of the route
    private requestDetails: any;           // Details of the request
    private studentDetails: any;           // Details of the student
    private cursoSolicitaDetails: any;           // Details of the curse
    private cursesDetails = [];           // Details of the curses of the current semester
    private cursoSolicitaDetailsMat:any;           // Details of the curses of the current semester
    private allSchools = [];           // Details of the curses of the current semester
    private periodList: any;                // Periods

    constructor(private _route: ActivatedRoute, private _location: Location, private _requestService: LevantamientoService,
        private _cursesService: CursesService, private _studentsService: StudentsService, private _settingsService: SettingsService) { }

    ngOnInit(): any {
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
                            // console.log('El req de los cursos del semestre');
                            // console.log(this.requestDetails.id);
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
}