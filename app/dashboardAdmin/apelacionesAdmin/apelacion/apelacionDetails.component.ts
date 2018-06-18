import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppealsService } from '../../services/appeals.service';
import { StudentsService } from '../../services/students.service';
import { SettingsService } from '../../services/settings.service';


@Component({
    moduleId: module.id,
    selector: 'details-Inclusion-Admin-cmp',
    templateUrl: 'apelacionDetails.component.html',
    providers: [AppealsService, StudentsService, SettingsService] // the provider of apelacion
})

export class ApelacionDetailsAdminComponent implements OnInit, OnDestroy {

    private apelacionId: string;             // The id of the request to search
    private requestSubscribe: any;         // The subscribe for get the params of the route
    private requestDetails: any;           // Details of the request
    private studentDetails: any;           // Details of the student
    private periodList: any;                // Periods
    private apelacionTipo: any;

    constructor(private _route: ActivatedRoute, private _settingsService: SettingsService, private _router: Router, private _requestService: AppealsService, private _studentsService: StudentsService) { }

    ngOnInit(): any {
        this.requestSubscribe = this._route.params.subscribe(params => {
            this.apelacionId = params['apelacionId']; // get the id
            this.apelacionTipo = params['apelaTipo']; // get the tipo

            this.requestDetails = // Default object to use in the html in a temporaly way 
            {
                "id": 0, 
                
                "estudiante": 0, 
        
                "periodo": 0, 
                "fecha_apelacion": "",
                "apelacion": "", "estado_apelacion": "",    
                "memo_apelacion":0, "sesion_apelacion":0,
                "encargado_apelacion": "", "requiere_proceso": "",
                "observacion_apelacion":""
            };

            this.studentDetails = {
                "carne": 0, "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
                "correo_electronico": "", "carrera": 0
            };

            this.periodList = { "anno": "", "semestre": "" };

            this._requestService.getByID(this.apelacionId, this.apelacionTipo).subscribe(  // get the details
                resp => {
                    console.log('La solicitud');
                    console.log(resp);
                    console.log('Esesesese');
                    this._settingsService.getPeriodById(resp.periodo).subscribe(  // get the status
                        resp => {
                            this.periodList = resp; // assign to the local object        
                        }
                    );
                    this.requestDetails = resp; // assign to the local object

                    this._studentsService.getByID(this.requestDetails.estudiante).subscribe(  // get the details
                        resp => {
                            this.studentDetails = resp; // assign to the local object        
                        }
                    );

                }
            );
        });
    }


    ngOnDestroy() {
        this.requestSubscribe.unsubscribe(); // Unsubscribe to remove the data
    };

    /**
     * Used to navigate to the principal page of inclusions
     */
    navigateToParent() {
        this._router.navigate(['admin/apelacion']);
    };
}