import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { RequestService } from '../../shared/request.service';
import { DatePipe } from '@angular/common';


declare var swal: any;
@Component({
    moduleId: module.id,
    selector: 'apelacion-cmp',
    templateUrl: 'apelacion.component.html',
    providers: [RequestService, Cookie, DatePipe]
})

export class ApelacionComponent implements OnInit {

    type: any;
    id: any;
    apelacion: string;
    observations: string;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private requestService: RequestService
        , private datePipe: DatePipe) {
        this.type = activatedRoute.snapshot.params["type"];
        this.id = activatedRoute.snapshot.params["id"];

    }

    ngOnInit(): void {

        switch (this.type) {
            case "inc":
                this.requestService.getSpecificInclusion(this.id).subscribe(
                    data => {
                        this.observations = data.observacion_solicitud;
                    }),
                    err => console.log("Error", err);
                break;
            case "req":
                this.requestService.getSpecificRequirement(this.id).subscribe(
                    
                    data => {
                        this.observations = data.observacion_solicitud;                        
                    }),
                    err => console.log("Error", err);
                break;
            case "rn":
                this.requestService.getSpecificRn(this.id).subscribe(
                    data => {
                        this.observations = data.observacion_solicitud;                        
                    }),
                    err => console.log("Error", err);
                break;
        }

    }

    goForm() {
        this.router.navigate(['/estudiantes/solicitudes/', this.type, this.id])

    }

    apelar() {

        swal({
            title: 'Guardando'
        });
        swal.showLoading();

        var tempDate: any = null;
        var date: any = null;


        tempDate = Date.now();
        date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
        console.log(date)


        var request = {
            "apelacion": this.apelacion,
            "fecha_apelacion": date,
            "estado_apelacion": "Enviado"
        }

        switch (this.type) {
            case "inc":
                this.requestService.appealInclusion(this.id, request).subscribe(
                    data => {
                        console.log(data);
                        swal.close();
                        swal({
                            title: "Enviado",
                            text: "Su apelacion ha sido realizada exitosamente",
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-success",
                            type: "success"
                        }).then(() => {
                            this.router.navigate(['/estudiantes/apelaciones/'])
                        });
                    }),
                    err => console.log("Error", err);

                break;

            case "req":
                this.requestService.appealRequirements(this.id, request).subscribe(
                    data => {
                        console.log(data);
                        swal.close();
                        swal({
                            title: "Enviado",
                            text: "Su apelacion ha sido realizada exitosamente",
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-success",
                            type: "success"
                        }).then(() => {
                            this.router.navigate(['/estudiantes/apelaciones/'])
                        });
                    }),
                    err => console.log("Error", err);
                break;

            case "rn":
                this.requestService.appealRn(this.id, request).subscribe(
                    data => {
                        console.log("appealrn")
                        console.log(data);
                        swal.close();
                        swal({
                            title: "Enviado",
                            text: "Su apelacion ha sido realizada exitosamente",
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-success",
                            type: "success"
                        }).then(() => {
                            this.router.navigate(['/estudiantes/apelaciones/'])
                        });
                    }),
                    err => console.log("Error", err);
                break;
        }

    }

}
