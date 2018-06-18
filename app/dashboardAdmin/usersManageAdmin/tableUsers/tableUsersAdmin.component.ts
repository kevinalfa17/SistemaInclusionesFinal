import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'table-Users-Admin-cmp',
    templateUrl: 'tableUsersAdmin.component.html',
    providers: [UsersService] // the provider of inclusions
})

export class TableUsersAdminComponent implements OnInit {

    dataServerUsers: any;   // Data from the server about users
    dataServerUsersRoles: any;   // Data from the server about roles 
    data = [[]];         //List of rows (arrays) with all data
    structure = {};    //Structure of the table

    constructor(private _usersService: UsersService) { }

    ngOnInit() {

        this._usersService.getAllAdminUsers().subscribe(  // get the details
            resp => {
                this.dataServerUsers = resp;

                this._usersService.getAllAdminUsersRoles().subscribe(
                    respuesta => {
                        this.dataServerUsersRoles = respuesta;
                        this.orderData(this.dataServerUsers, this.dataServerUsersRoles);
                    }
                );
            }
        );

        this.structure = { // the array of the structure of the header to use in the table
            columns: [
                { name: "Nombre", type: "text", editable: false },
                { name: "Apellidos", type: "text", editable: false },
                { name: "Cargo", type: "eventValueRoles", editable: true },
                { name: "Correo", type: "text", editable: false },
                { name: "Contraseña", type: "eventValue", editable: true },
            ]
            , header: true, footer: false, edit: true, delete: true
        };
    }

    /**
     * Function used to order the data from the server
     * @param array All the data to order of users
     ** @param array2 All the data to order of roles
     */
    orderData(array, array2) {
        for (var i = 0; i < array.length; i++) {
            var nam = array[i].primer_nombre + " " + array[i].segundo_nombre;
            this.data[i].push(nam);
            var last = array[i].primer_apellido + " " + array[i].segundo_apellido;
            this.data[i].push(last);

            var j = 0;

            // console.log(array);
            // console.log(array2);
            var tempoRoles = "";
            while (j < array2.length) {
                if (array2[j].id_rol == array[i].role) {

                    tempoRoles = tempoRoles + ", " + array2[i].nombre
                }
                j++;
            }
            if (tempoRoles == "") {
                tempoRoles = "No especificado";
            }
            tempoRoles = tempoRoles.substr(2);
            this.data[i].push(tempoRoles);

            this.data[i].push(array[i].correo_electronico);
            this.data[i].push("Información no visible");
            this.data.push([]);
        }
        this.data.pop();

    }

    changePassword(item) {
        //this._usersService.editData(this.data[item][3]); // poner el ID en vez de correo
    }

    editRoles(item) {
        console.log(" ggg " + item);

        swal({
            title: 'Editar roles',
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,


            html: 'Escriba el rol que desea asignar al usuario, separados por una coma si desea agregar más de uno. Aquellos roles que no existan no seán considerados,' +
                'además, si el usuario ya tiene el rol que escribe en el campo este será eliminado de los roles' +
                '<input id="swal-input1" class="swal2-input">'
        })

            .then(() => {

                var res = $('#swal-input1').val().split(", ");
                var res2 = this.data[item][2].split(", ");
                var newRoles = [];
                
                for (var i = 0; i < this.dataServerUsersRoles.length; i++) {
                    
                    for (var j = 0; j < res.length; j++) {
                        
                        if (this.dataServerUsersRoles[i].nombre == res[j]) {
                            //console.log("lo meti ");
                            newRoles.push(this.dataServerUsersRoles[i]);
                        }
                    }
                }


                for (var k = 0; k < newRoles.length; k++) {
                    for (var p = 0; p < res.length; p++) {
                
                        if (res2[p] == newRoles[k].nombre) {
                            //console.log("lo encontre ");
                            newRoles.splice(k, 1);
                        }
                    }
                }

                this._usersService.changeRoles(this.data[3], newRoles);



            })

            .then(() => {
                swal({
                    title: 'Acción realizada!',
                    text: 'Los cambios serán efectuados de manera permanente.',
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });

            })



            .catch(function () {
                swal({
                    title: 'Acción denegada!',
                    text: 'Los cambios no serán efectuados.',
                    type: 'warning',
                    allowOutsideClick: false,
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });
            });


    }

}
