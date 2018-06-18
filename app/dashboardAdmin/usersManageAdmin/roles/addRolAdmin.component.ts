import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'add-Rol-Admin-cmp',
    templateUrl: 'addRolAdmin.component.html',
    providers: [UsersService] // the provider of inclusions
})

export class AddRolAdminComponent implements OnInit {
    dataServerUsersRoles = [];   // Data from the server about roles 

    private newRol = {
        "nombre": "", "sistema": 1
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

    addNewRol(){
        this._usersService.addRole(this.newRol);
        this.newRol = {"nombre": "", "sistema": 1};
    }


}
