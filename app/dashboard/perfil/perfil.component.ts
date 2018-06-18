import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'perfil-cmp',
    templateUrl: 'perfil.component.html',
    providers: [RequestService, Cookie]
})

export class PerfilComponent implements OnInit {



    correo: string;
    nombre: string;
    carne: string;

    email: string = "";
    emailConfirmation: string = "";

    constructor(private requestService: RequestService) {

    }

    ngOnInit(): void {
        this.correo = Cookie.get('correo');
        this.nombre = Cookie.get('nombre');
        this.carne = Cookie.get('carne');
    }

    emailChange() {
        if (this.email !== this.emailConfirmation || this.email == "") {
            swal({
                title: "Los correos no coinciden o son incorrectos!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger"
            });
        }
        else {
            swal({
                title: '¿Estas seguro?',
                text: "Este email sera utilizado para ingresar las proximas veces! Asegurese de que sea correcto",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Cambiar mi correo',
                buttonsStyling: false
            }).then(() => {



                var request = {
                    "carne": this.carne,
                    "primer_nombre": this.nombre.split(" ")[0],
                    "segundo_nombre": this.nombre.split(" ")[1],
                    "primer_apellido": this.nombre.split(" ")[2],
                    "segundo_apellido": this.nombre.split(" ")[3],
                    "correo_electronico": this.email
                };

                console.log("request" + JSON.stringify(request))

                this.requestService.updateProfile(request).subscribe(
                    data => {

                        console.log(data);
                    }),
                    err => console.log("Error", err)

                    swal({
                        title: 'Cambiado!',
                        text: 'Su correo de acceso ha sido cambiado',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    })

                    Cookie.set('correo',this.email);
                    this.correo = this.email;

            });
        }
    }

}
