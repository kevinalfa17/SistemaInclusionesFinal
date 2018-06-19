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
var router_1 = require('@angular/router');
var auth_service_1 = require('../shared/auth.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var LoginAdCoComponent = (function () {
    function LoginAdCoComponent(_reqService, router) {
        this._reqService = _reqService;
        this.router = router;
        this.password = "";
        this.email = "";
        this.service = 0;
    }
    //lcortes@itcr.ac.cr
    //welcome123
    LoginAdCoComponent.prototype.logIn = function () {
        var _this = this;
        var request = {
            "correo_electronico": this.email,
            "password": btoa(this.password)
        };
        console.log(request);
        this._reqService.login(request).subscribe(function (data) {
            if (data.statusText == "Unauthorized") {
                console.log('nonononono');
            }
            else {
                if (data.first_time == true) {
                    // console.log(data);
                    console.log("debe ir a cambiar la contrasena");
                }
                // console.log(data);
                ng2_cookies_1.Cookie.set('idUser', data.usuario.id);
                ng2_cookies_1.Cookie.set('correo', data.usuario.correo_electronico);
                ng2_cookies_1.Cookie.set('nombre', data.usuario.primer_nombre + ' ' + data.usuario.segundo_nombre + ' ' + data.usuario.primer_apellido + ' ' + data.usuario.segundo_apellido);
                var roles = { "role1": null, "role2": null };
                // console.log(data.usuario.rols);
                for (var i = 0; i < data.usuario.rols.length; ++i) {
                    if (data.usuario.rols[i].sistema == 1) {
                        var ir = data.usuario.rols[i].id_rol;
                        console.log(ir);
                        if (ir == 1) {
                            roles.role1 = '1';
                        }
                        if (ir == 3) {
                            roles.role2 = '3';
                        }
                    }
                }
                console.log(roles);
                // console.log('cook21'); kevinalfa17@gmail.com
                // Cookie.set("role1", roles.role1);
                // Cookie.set("role2", roles.role2);
                // console.log('cook22');
                // console.log(this.service);
                if (true) {
                    if ((roles.role1 == "1") && (_this.service == 0)) {
                        // console.log("herere111");
                        ng2_cookies_1.Cookie.set('role1', roles.role1);
                        ng2_cookies_1.Cookie.set('role2', roles.role2);
                        _this.router.navigate(['admin/inicio']);
                    }
                    if ((roles.role2 == "3") && (_this.service == 1)) {
                        // console.log("herere222");
                        ng2_cookies_1.Cookie.set('role1', roles.role1);
                        ng2_cookies_1.Cookie.set('role2', roles.role2);
                        _this.router.navigate(['com/inicio']);
                    }
                }
            }
        });
    };
    LoginAdCoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'loginAdCo-cmp',
            templateUrl: 'loginAdCo.component.html',
            providers: [auth_service_1.AuthService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginAdCoComponent);
    return LoginAdCoComponent;
}());
exports.LoginAdCoComponent = LoginAdCoComponent;
//# sourceMappingURL=loginAdCo.component.js.map