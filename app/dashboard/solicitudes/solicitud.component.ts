import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../shared/request.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';


declare var swal: any;
@Component({
    moduleId: module.id,
    selector: 'solicitud-cmp',
    templateUrl: 'solicitud.component.html',
    providers: [RequestService, Cookie, DatePipe]
})

export class SolicitudComponent implements OnInit {

    type: any;
    id: any;
    disabled: boolean = false;

    //Phone mask
    public mask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    //Inc
    cursoLevantar: string = null;
    creditosLevantar: string = null;
    professor: string = null;
    group: number = null;
    phone: string = null;
    score: number = null;
    previousScore: number = null;
    enroll_date: string = null;
    course: Number = null;

    check1: boolean = true;
    check2: boolean = true;
    check3: boolean = true;

    cursoRN = null;
    cursoRequisitos = null;

    cursoLevantar2: string = null;
    creditosLevantar2: string = null;

    cursoLevantar3: string = null;
    creditosLevantar3: string = null;

    letter: string = null;


    //Req
    selectLevantar: Number = null;
    selectMatricular: Number = null;
    cursoMatricular: string = null;
    creditosMatricular: string = null;

    //RN
    rn: number = null;

    courses: Array<any> = [];
    telephone: string = null; 


    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private requestService: RequestService, private datePipe: DatePipe) {
        this.type = activatedRoute.snapshot.params["type"];
        this.id = activatedRoute.snapshot.params["id"];
        $('.label-floating').removeClass('is-empty');

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

        switch (this.type) {
            case "inc":
                this.requestService.getSpecificInclusion(this.id).subscribe(
                    data => {
                        this.phone = data["telefono"];
                        this.telephone = data["telefono_fijo"];
                        this.score = data["promedio_general"];
                        this.enroll_date = data["cita_matricula"];
                        this.cursoLevantar = data["curso"];
                        this.group = data["grupo"];
                        this.professor = data["profesor"];
                        this.letter = data["carta"];

                        for (var i = 0; i < this.courses.length; i++) {
                            if (this.courses[i].codigo == this.cursoLevantar) {
                                this.course = i;
                            }
                        }

                    }),
                    err => console.log("Error", err);
                break;
            case "req":
                this.requestService.getSpecificRequirement(this.id).subscribe(

                    data => {

                        this.phone = data["telefono"];
                        this.telephone = data["telefono_fijo"];
                        this.score = data["promedio_general"];
                        this.previousScore = data["promedio_semestre_anterior"];
                        this.cursoLevantar = data["curso_levantar"];
                        this.cursoMatricular = data["curso_matricular"];
                        this.letter = data["carta"];

                        for (var i = 0; i < this.courses.length; i++) {
                            if (this.courses[i].codigo == this.cursoLevantar) {
                                this.selectLevantar = i;
                            }
                            if (this.courses[i].codigo == this.cursoMatricular) {
                                this.selectMatricular = i;
                            }
                        }
                    }),
                    err => console.log("Error", err);
                break;
            case "rn":
                this.requestService.getSpecificRn(this.id).subscribe(
                    data => {
                        this.phone = data["telefono"];
                        this.telephone = data["telefono_fijo"];
                        this.score = data["promedio_general"];
                        this.previousScore = data["promedio_semestre_anterior"];
                        this.cursoLevantar = data["curso_levantar"];
                        this.letter = data["carta"];
                        this.rn = data["rn"];

                        for (var i = 0; i < this.courses.length; i++) {
                            if (this.courses[i].codigo == this.cursoLevantar) {
                                this.selectLevantar = i;
                            }
                        }
                    }),
                    err => console.log("Error", err);
                break;
        }
    }


    onChange1(val) {
        this.cursoLevantar = this.courses[val].codigo;
        this.creditosLevantar = this.courses[val].creditos;
    }

    onChange2(val) {
        this.cursoLevantar2 = this.courses[val].codigo;
        this.creditosLevantar2 = this.courses[val].creditos;

        this.cursoMatricular = this.courses[val].codigo;
        this.creditosMatricular = this.courses[val].creditos;
    }

    onChange3(val) {
        this.cursoLevantar3 = this.courses[val].codigo;
        this.creditosLevantar3 = this.courses[val].creditos;
    }




    back() {
        this.router.navigate(['../../../solicitudes'], { relativeTo: this.activatedRoute });
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

        switch (this.type) {
            case "inc":

                if (this.professor == null || this.group == null || this.phone == null || this.telephone == null ||
                    this.score == null || this.enroll_date == null || this.course == null) {
                    correct = false;

                }


                if ((this.check1 || this.check2 || this.check3)) {
                    if (this.previousScore == null || ((this.check1 || this.check2) && this.cursoRequisitos == null)
                        || (this.check3 && this.cursoRN == null))
                        correct = false;
                }
                break;
            case "req":
                correct = !(this.telephone == null ||this.phone == null  || this.score == null || this.previousScore == null ||
                    this.selectLevantar == null);

                break;
            case "rn":
                correct = !(this.telephone == null || this.phone == null || this.score == null || this.previousScore == null
                    || this.selectLevantar == null || this.rn == null)
                break;
            default:
                correct = false;
        }



        if (correct == false) {

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

        if (this.type == "inc") {

            var request = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "cita_matricula": this.enroll_date,
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

            this.requestService.updateInclusion(request,this.id).subscribe(
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

        //Levantamiento de requisito
        if (this.type == "req") {
            var request2 = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "curso_levantar": this.cursoLevantar2,
                "curso_matricular": this.cursoLevantar,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            }

            this.requestService.updateRequirements(request2,this.id).subscribe(
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
        if (this.type == "rn") {
            var request3 = {
                "telefono": this.phone,
                "telefono_fijo": this.telephone,
                "promedio_general": this.score,
                "promedio_semestre_anterior": this.previousScore,
                "curso": this.cursoLevantar3,
                "rn": this.rn,
                "periodo": 1,
                "fecha_solicitud": date,
                "estado_solicitud": state,
                "carta": this.letter,
            }


            this.requestService.updateRn(request3,this.id).subscribe(
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


}
