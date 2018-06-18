import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../shared/request.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'verificacionLogin-cmp',
    templateUrl: 'verificacionLogin.component.html',
    providers: [RequestService, Cookie]
})

export class VerificacionLoginComponent {

    disabledButton: boolean = true;
    password: string = "";
    id: string;
    email: string;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute, private requestService: RequestService) {


        this.id = activatedRoute.snapshot.params["id"];
        this.email = activatedRoute.snapshot.params["email"];

        console.log(this.email)

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }


    onChange() {
        if (this.password !== "") {
            this.disabledButton = false;
        }
        else {
            this.disabledButton = true;
        }
    }

    login() {

        var request = {
            "carne": this.id,
            "email": this.email,
            "token": this.password
        }


        this.requestService.login(request).subscribe(
            data => {
                var nombre = data.primer_nombre +" "+ data.segundo_nombre +" "+ data.primer_apellido
                +" "+ data.segundo_apellido + "";
                Cookie.set('carne', data.carne);
                Cookie.set('correo', data.correo_electronico);
                Cookie.set('nombre', nombre);

                this.router.navigate(['estudiantes/inicio']);

                console.log(data);
            }),
            err => console.log("Error", err)

        //this.router.navigateByUrl('/estudiantes/inicio');
    }

}
