import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'loginAdCo-cmp',
    templateUrl: 'loginAdCo.component.html',
    providers: [AuthService, Cookie]
})

export class LoginAdCoComponent {

    password: string = "welcome123";
    email: string = "lcortes@itcr.ac.cr";
    service: number = 0;

    constructor(private _reqService: AuthService, private router: Router) {

    }
    //lcortes@itcr.ac.cr
    //welcome123


    logIn() {

        var request = {
            "correo_electronico": this.email,
            "password": btoa(this.password)
        }

        console.log(request);
        this._reqService.login(request).subscribe(
            data => {

                if (data.statusText == "Unauthorized") {
                    console.log('nonononono');
                } else {
                    if (data.first_time == true) {
                        // console.log(data);
                        console.log("debe ir a cambiar la contrasena");
                    }
                    // console.log(data);

                    Cookie.set('idUser', data.usuario.id);
                    Cookie.set('correo', data.usuario.correo_electronico);
                    Cookie.set('nombre', data.usuario.primer_nombre + ' ' + data.usuario.segundo_nombre + ' ' + data.usuario.primer_apellido + ' ' + data.usuario.segundo_apellido);

                    var roles = { "role1": null, "role2": null };

                    // console.log(data.usuario.rols);


                    for (var i = 0; i < data.usuario.rols.length; ++i) {

                        if (data.usuario.rols[i].sistema == 1) {
                            var ir = data.usuario.rols[i].id_rol;
                            if (ir == 1) {
                                roles.role1 = '1';
                            }
                            if (ir == 2) {
                                roles.role2 = '3';
                            }
                        }
                    }

                    // console.log(roles);

                    roles.role1 = "1";
                    roles.role2 = "3";

                    // console.log('cook21');
                    // console.log(Cookie.get("role1"));
                    // console.log(Cookie.get("role2"));
                    // console.log('cook22');
                    // console.log(this.service);

                    if (true) {

                        if ((roles.role1 == "1") && (this.service == 0)) {
                            // console.log("herere111");
                            Cookie.set('role1', roles.role1);
                            Cookie.set('role2', roles.role2);
                            this.router.navigate(['admin/inicio']);
                        }

                        if ((roles.role2 == "3") && (this.service == 1)) {
                            // console.log("herere222");
                            Cookie.set('role1', roles.role1);
                            Cookie.set('role2', roles.role2);
                            this.router.navigate(['com/inicio']);
                        }
                    }
                }
            });
    }

}
