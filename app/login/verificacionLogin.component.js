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
var request_service_1 = require('../shared/request.service');
var ng2_cookies_1 = require('ng2-cookies/ng2-cookies');
var VerificacionLoginComponent = (function () {
    function VerificacionLoginComponent(router, activatedRoute, requestService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.requestService = requestService;
        this.disabledButton = true;
        this.password = "";
        this.id = activatedRoute.snapshot.params["id"];
        this.email = activatedRoute.snapshot.params["email"];
        console.log(this.email);
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }
    VerificacionLoginComponent.prototype.onChange = function () {
        if (this.password !== "") {
            this.disabledButton = false;
        }
        else {
            this.disabledButton = true;
        }
    };
    VerificacionLoginComponent.prototype.login = function () {
        var _this = this;
        var request = {
            "carne": this.id,
            "email": this.email,
            "token": this.password
        };
        this.requestService.login(request).subscribe(function (data) {
            var nombre = data.primer_nombre + " " + data.segundo_nombre + " " + data.primer_apellido
                + " " + data.segundo_apellido + "";
            ng2_cookies_1.Cookie.set('carne', data.carne);
            ng2_cookies_1.Cookie.set('correo', data.correo_electronico);
            ng2_cookies_1.Cookie.set('nombre', nombre);
            _this.router.navigate(['estudiantes/inicio']);
            console.log(data);
        }),
            function (err) { return console.log("Error", err); };
        //this.router.navigateByUrl('/estudiantes/inicio');
    };
    VerificacionLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'verificacionLogin-cmp',
            templateUrl: 'verificacionLogin.component.html',
            providers: [request_service_1.RequestService, ng2_cookies_1.Cookie]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, request_service_1.RequestService])
    ], VerificacionLoginComponent);
    return VerificacionLoginComponent;
}());
exports.VerificacionLoginComponent = VerificacionLoginComponent;
//# sourceMappingURL=verificacionLogin.component.js.map