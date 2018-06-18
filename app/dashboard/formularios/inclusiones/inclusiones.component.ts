import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../shared/request.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


declare var swal: any;
@Component({
    moduleId: module.id,
    selector: 'inclusiones-cmp',
    templateUrl: 'inclusiones.component.html',
    providers: [RequestService, Cookie, DatePipe]
})

export class InclusionesComponent implements OnInit {

    cursoLevantar: string = null;
    creditosLevantar: string = null;
    professor: string = null;
    group: number = null;
    phone: string = null;
    telephone: string = null;
    score: number = null;
    previousScore: number = null;
    enroll_date: string = null;
    course: string = null;
    letter: string = null;

    check1: boolean = false;
    check2: boolean = false;
    check3: boolean = false;

    cursoRN = null;
    cursoRequisitos = null;

    cursoLevantar2: string = null;
    creditosLevantar2: string = null;

    cursoLevantar3: string = null;
    creditosLevantar3: string = null;

    courses: Array<any> = [];

    rn: number = null;

    disabled: boolean = false;
    


    //Phone mask
    public mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


    constructor(private requestService: RequestService, private datePipe: DatePipe,
        private router: Router) {


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
        this.cursoLevantar2 = this.courses[val].codigo;
        this.creditosLevantar2 = this.courses[val].creditos;
    }

    onChange3(val) {
        this.cursoLevantar3 = this.courses[val].codigo;
        this.creditosLevantar3 = this.courses[val].creditos;
    }

    save() {

        swal({
            title: 'Guardando'
        });
        swal.showLoading();

        this.sendForm("Guardado")

    }

    send() {
        var correct = true;

        if (this.professor == null || this.group == null || this.phone == null || this.telephone == null ||
            this.score == null || this.enroll_date == null || this.course == null) {
            correct = false;

        }


        if ((this.check1 || this.check2 || this.check3)) {
            if (this.previousScore == null || ((this.check1 || this.check2) && this.cursoRequisitos == null)
                || (this.check3 && this.cursoRN == null))
                correct = false;
        }

        if (correct == false) {

            if ((this.course == null) || (this.check3 && this.cursoRN == null) || ((this.check1 || this.check2) && this.cursoRequisitos == null)) {
                swal({
                    title: "Error",
                    text: "No puede enviar un formulario sin especificar curso",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-danger",
                    type: "error"
                })
            }
            else {

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

        var request = {
            "correo_electronico": Cookie.get("correo"),
            "telefono": this.phone,
            "telefono_fijo": this.telephone,            
            "promedio_general": this.score,
            "cita_matricula": this.enroll_date,
            "estudiante": Cookie.get("carne"),
            "curso": this.cursoLevantar,
            "grupo": Number(this.group),
            "profesor": this.professor,
            "periodo": 1,
            "fecha_solicitud": date,
            "estado_solicitud": state,
            "carta": this.letter,
        }

        console.log()

        console.log("request" + JSON.stringify(request))

        this.requestService.sendInclusion(request).subscribe(
            data => {
                console.log(data);
                swal.close();

                if (!(this.check1 || this.check2 || this.check3)) {

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
                }


            }),
            err => console.log("Error", err);

        //Levantamiento de requisito
        if (this.check1 || this.check2) {

            console.log("req check")
            console.log(this.cursoLevantar2)
            console.log(this.cursoLevantar)
            var request2 = {
                "correo_electronico": Cookie.get("correo"),
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "estudiante": Cookie.get("carne"),
                "curso_levantar": this.cursoLevantar2,
                "curso_matricular": this.cursoLevantar,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            }

            console.log("request" + JSON.stringify(request2))

            this.requestService.sendRequirements(request2).subscribe(
                data => {
                    console.log(data);
                    swal.close();
                    if (true) {
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

                    }
                }),
                err => console.log("Error", err);




        }

        //Levantamiento de RN
        if (this.check3) {
            var request3 = {
                "correo_electronico": Cookie.get("correo"),
                "telefono": this.phone,
                "telefono_fijo": this.telephone,                
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "estudiante": Cookie.get("carne"),
                "curso": this.cursoLevantar3,
                "rn": this.rn,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            }

            console.log("request" + JSON.stringify(request3))

            this.requestService.sendRn(request3).subscribe(
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

    /*this.requestService.postInclusion(request).subscribe(
      data => {
          console.log(data);
      })
}*/

}
