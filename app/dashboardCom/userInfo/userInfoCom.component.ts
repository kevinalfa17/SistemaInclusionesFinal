import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'UserInfoCom-cmp',
    templateUrl: 'userInfoCom.component.html',
    providers: [UsersService, Cookie, UsersService]
})

export class UserInfoComComponent implements OnInit {

    currentUser = {
        "correo_electronico": "",
        "contrasenna": "",
        "primer_nombre": "",
        "segundo_nombre": "",
        "primer_apellido": "",
        "segundo_apellido": "",
        "role": 0,
        "id": 0,
        "cedula": ""
    };

    pass = "";

    constructor(private _reqService: UsersService, private router: Router) {

    }

    ngOnInit(): any {

        this._reqService.getByID(Cookie.get("idUser")).subscribe(resp => {
            this.currentUser = resp;
        });

    }

    updateData() {
        this._reqService.editData(this.currentUser.id, this.currentUser).subscribe(resp => {
            console.log(resp);
        });
    }

    update() {
        if (this.pass != "") {
            console.log('pass');
            this.currentUser.contrasenna = btoa(this.pass);

        }

        this.updateData();
    }

    logout() {
        Cookie.deleteAll();
        this.router.navigate(['loginAdCo']);
    }

}