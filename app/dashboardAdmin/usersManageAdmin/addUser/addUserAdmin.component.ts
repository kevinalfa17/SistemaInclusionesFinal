import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InclusionsService } from '../../services/inclusions.service';
import { UsersService } from '../../services/users.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'add-Users-Admin-cmp',
    templateUrl: 'addUserAdmin.component.html',
    providers: [UsersService] // the provider of inclusions
})

export class AddUserAdminComponent implements OnInit, AfterViewInit {
    dataServerUsersRoles = [];   // Data from the server about roles 

    private newUser = {
        "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
        "role": 0, "correo_electronico": ""
    };

    constructor(private _usersService: UsersService) { }

    ngOnInit() {
        this._usersService.getAllAdminUsersRoles().subscribe(
            respuesta => {
                //console.log(respuesta);
                //this.dataServerUsersRoles = respuesta;

                var RecorrerWhile = 0;
                while (RecorrerWhile < respuesta.length) {
                    if (respuesta[RecorrerWhile].sistema == 1) {
                        this.dataServerUsersRoles.push(respuesta[RecorrerWhile]);
                    }
                    RecorrerWhile = RecorrerWhile + 1;
                }

                //console.log(this.dataServerUsersRoles);
            }
        );
    }

    ngAfterViewInit() {
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    }

    registerUser() {
        //console.log("jhajajaja ::::::: " + JSON.stringify(this.newUser));
        this._usersService.registerUserAdmin(JSON.stringify(this.newUser));
        this.newUser = {
            "primer_nombre": "", "segundo_nombre": "", "primer_apellido": "", "segundo_apellido": "",
            "role": 0, "correo_electronico": ""
        };
    }

}
