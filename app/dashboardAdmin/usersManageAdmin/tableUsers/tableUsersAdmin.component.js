"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var users_service_1 = require('../../services/users.service');
var TableUsersAdminComponent = (function () {
    function TableUsersAdminComponent(_usersService) {
        this._usersService = _usersService;
        this.data = [[]]; //List of rows (arrays) with all data
        this.structure = {}; //Structure of the table
    }
    TableUsersAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._usersService.getAllAdminUsers().subscribe(// get the details
        function (// get the details
            resp) {
            _this.dataServerUsers = resp;
            _this._usersService.getAllAdminUsersRoles().subscribe(function (respuesta) {
                _this.dataServerUsersRoles = respuesta;
                _this.orderData(_this.dataServerUsers, _this.dataServerUsersRoles);
            });
        });
        this.structure = {
            columns: [
                { name: "Nombre", type: "text", editable: false },
                { name: "Apellidos", type: "text", editable: false },
                { name: "Cargo", type: "eventValueRoles", editable: true },
                { name: "Correo", type: "text", editable: false },
                { name: "Contraseña", type: "eventValue", editable: true },
            ],
            header: true, footer: false, edit: true, delete: true
        };
    };
    /**
     * Function used to order the data from the server
     * @param array All the data to order of users
     ** @param array2 All the data to order of roles
     */
    TableUsersAdminComponent.prototype.orderData = function (array, array2) {
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
                    tempoRoles = tempoRoles + ", " + array2[i].nombre;
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
    };
    TableUsersAdminComponent.prototype.changePassword = function (item) {
        //this._usersService.editData(this.data[item][3]); // poner el ID en vez de correo
    };
    TableUsersAdminComponent.prototype.editRoles = function (item) {
        var _this = this;
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
            .then(function () {
            var res = $('#swal-input1').val().split(", ");
            var res2 = _this.data[item][2].split(", ");
            var newRoles = [];
            for (var i = 0; i < _this.dataServerUsersRoles.length; i++) {
                for (var j = 0; j < res.length; j++) {
                    if (_this.dataServerUsersRoles[i].nombre == res[j]) {
                        //console.log("lo meti ");
                        newRoles.push(_this.dataServerUsersRoles[i]);
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
            _this._usersService.changeRoles(_this.data[3], newRoles);
        })
            .then(function () {
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
    };
    TableUsersAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-Users-Admin-cmp',
            templateUrl: 'tableUsersAdmin.component.html',
            providers: [users_service_1.UsersService] // the provider of inclusions
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], TableUsersAdminComponent);
    return TableUsersAdminComponent;
}());
exports.TableUsersAdminComponent = TableUsersAdminComponent;
//# sourceMappingURL=tableUsersAdmin.component.js.map