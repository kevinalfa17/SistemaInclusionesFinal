import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../shared/request.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';



declare var swal: any;
@Component({
    moduleId: module.id,
    selector: 'requisitos-cmp',
    templateUrl: 'requisitos.component.html',
    providers: [RequestService, Cookie, DatePipe]
})

export class RequisitosComponent implements OnInit {

    cursoLevantar: string = null;
    creditosLevantar: string = null;
    cursoMatricular: string = null;
    creditosMatricular: string = null;

    phone: string = null;
    telephone: string = null;    
    score: number = null;
    previousScore: number = null;
    selectLevantar: string = null;
    selectMatricular: string = null;

    letter: string = null;

    courses: Array<any> = [];

    disabled: boolean = false;
    


    public mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private requestService: RequestService, private router: Router, private datePipe: DatePipe) {

    }

    ngOnInit(): void {
        
        this.requestService.getConfig().subscribe(
            data => {
                console.log(data);
                var tempDate = data.fecha_intermedio.split("T")[0];
                var actualDate = new Date();
                var finalDate = new Date(tempDate);

                console.log("actualDate " + actualDate)
                console.log("finalDate " + finalDate)

                if(actualDate <= finalDate){
                    this.disabled = false;
                    console.log("enabled")
                }
                else{
                    this.disabled = true;
                    console.log("disabled")
                }

            }),
            err => console.log("Error", err);

        this.requestService.getCourses().subscribe(
            data => {
                console.log(data);
                this.courses = data;
            }),
            err => console.log("Error", err);
    }

    onChange1(val) {
        this.cursoLevantar = this.courses[val].codigo;
        this.creditosLevantar = this.courses[val].creditos;
    }

    onChange2(val) {
        this.cursoMatricular = this.courses[val].codigo;
        this.creditosMatricular = this.courses[val].creditos;
    }

    save() {
        swal({
            title: 'Guardando'
        });
        swal.showLoading();

        this.sendForm("Guardado")
    }

    send() {


        if (this.phone == null || this.telephone == null || this.score == null || this.previousScore == null) {

            if (this.selectLevantar == null || this.selectMatricular == null) {
                swal({
                    title: "Error",
                    text: "No puede enviar un formulario sin especificar curso",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-danger",
                    type: "error"
                })
            } else {

                swal({
                    title: '¿Estas seguro?',
                    text: "Esta apunto de enviar un formulario con errores o campos vacios",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Enviar de todas formas',
                    buttonsStyling: false
                }).then(() => {
                    swal({
                        title: 'Enviando'
                    });
                    swal.showLoading();
                    this.sendForm("Enviado")
                });
            }

        }
        else {

            swal({
                title: 'Enviando'
            });
            swal.showLoading();
            this.sendForm("Enviado")
        }
    }

    sendForm(state) {

        var tempDate: any = null;
        var date: any = null;

        if (state == "Enviado") {
            tempDate = Date.now();
            date = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
            console.log(date)
        }

        console.log("correo" + Cookie.get("correo"))

        var request = {
            "correo_electronico": Cookie.get("correo"),
            "telefono": this.phone,
            "telefono_fijo": this.telephone,   
            "promedio_general": this.score,
            "promedio_semestre_anterior": this.previousScore,
            "estudiante": Cookie.get("carne"),
            "curso_levantar": this.cursoLevantar,
            "curso_matricular": this.cursoMatricular,
            "periodo": 1,
            "fecha_solicitud": date,
            "estado_solicitud": state,
            "carta": this.letter,
        }

        console.log("request" + JSON.stringify(request))

        this.requestService.sendRequirements(request).subscribe(
            data => {
                console.log(data);
                swal.close();

                if (state == "Guardado") {
                    //Guardado!
                    swal({
                        title: "Guardado",
                        text: "Su formulario ha sido guardado exitosamente",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).then(() => {
                        this.router.navigate(['/estudiantes/solicitudes/'])
                    });

                }
                else {
                    swal({
                        title: 'Enviado',
                        text: 'Su formulario ha sido enviado exitosamente',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    }).then(() => {
                        this.router.navigate(['/estudiantes/solicitudes/'])
                    });
                }


            }),
            err => console.log("Error", err);

    }

}
