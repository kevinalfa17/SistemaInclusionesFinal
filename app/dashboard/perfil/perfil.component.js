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
var request_service_1 = require('../../shared/request.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var PerfilComponent = (function () {
    function PerfilComponent(requestService) {
        this.requestService = requestService;
        this.email = "";
        this.emailConfirmation = "";
    }
    PerfilComponent.prototype.ngOnInit = function () {
        this.correo = ng2_cookies_1.Cookie.get('correo');
        this.nombre = ng2_cookies_1.Cookie.get('nombre');
        this.carne = ng2_cookies_1.Cookie.get('carne');
    };
    PerfilComponent.prototype.emailChange = function () {
        var _this = this;
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
            }).then(function () {
                var request = {
                    "carne": _this.carne,
                    "primer_nombre": _this.nombre.split(" ")[0],
                    "segundo_nombre": _this.nombre.split(" ")[1],
                    "primer_apellido": _this.nombre.split(" ")[2],
                    "segundo_apellido": _this.nombre.split(" ")[3],
                    "correo_electronico": _this.email
                };
                console.log("request" + JSON.stringify(request));
                _this.requestService.updateProfile(request).subscribe(function (data) {
                    console.log(data);
                }),
                    function (err) { return console.log("Error", err); };
                swal({
                    title: 'Cambiado!',
                    text: 'Su correo de acceso ha sido cambiado',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });
                ng2_cookies_1.Cookie.set('correo', _this.email);
                _this.correo = _this.email;
            });
        }
    };
    PerfilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'perfil-cmp',
            templateUrl: 'perfil.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService])
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
//# sourceMappingURL=perfil.component.js.map