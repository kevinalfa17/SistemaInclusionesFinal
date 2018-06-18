import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../shared/request.service';


declare var swal: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'estudiantesLogin-cmp',
    templateUrl: 'estudiantesLogin.component.html',
    providers: [RequestService]
})


export class EstudiantesLoginComponent implements OnInit {

    id: string = "";
    email: string = "";
    //disabledButton: boolean = true;


    //public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/];


    constructor(private router: Router, private requestService: RequestService) {

    }

    ngOnInit() {
        $.getScript('../../../../assets/js/core/jquery.validate.min.js');
        $('#registerFormValidation').validate();
    }

    /*onChange() {
        if (this.email !== "" && this.id !== "") {
            this.disabledButton = false;
        }
        else {
            this.disabledButton = true;
        }
    }*/

    showTerms() {
        swal({
            showCancelButton: true,
            confirmButtonText: 'Acepto los terminos y condiciones',
            cancelButtonText: 'Cancelar',
            title: 'T&eacute;rminos y condiciones',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            html:

            '<textarea readonly style="resize:none; width:100%;height: 150px;overflow-y: auto;font-size: 13px">' +
            '1. Para dar trámite a su solicitud debe completar la totalidad del formulario, y entregarlo en las fechas establecidas.Si hay espacios en blanco o se detecta alguna falsedad en la información, el formulario no será tramitado.&#13;&#10;&#13;&#10;' +
            '2. El trámite es estrictamente personal y debe utilizar exclusivamente su correo y carné de estudiante.&#13;&#10;&#13;&#10;' +
            '3. Antes de presentar el formulario, infórmese sobre el documento: Lineamientos para Levantamiento de Requisitos, Correquisitos y Rn.&#13;&#10;&#13;&#10;' +
            '4. Los resultados del trámite, serán comunicados a través de la Asociación de Estudiantes de Ingeniería en Computadores (ASEIC); la solicitud del trámite, no garantiza el levantamiento solicitado.' +
            '</textarea><br>'
        }).then(() => {
            var request = {
                "carne": this.id,
                "email": this.email
            }
            this.requestService.generateToken(request).subscribe(
                data => {
                    console.log(data);
                }),
                err => console.log("Error", err)

            this.router.navigate(['login/verificacion',this.id,this.email]);
        });
    }
}
