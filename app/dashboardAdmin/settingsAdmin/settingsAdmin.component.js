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
var initDatetimepickers = require('../../../assets/js/init/initDatetimepickers.js');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var settings_service_1 = require('../services/settings.service');
var SettingsAdminComponent = (function () {
    function SettingsAdminComponent(_settingsService) {
        this._settingsService = _settingsService;
    }
    SettingsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.periodo = { "anno": "", "semestre": "" };
        this._settingsService.getCurrentSettings().subscribe(// get the details
        function (// get the details
            resp) {
            console.log(resp);
            _this.initial = resp.fecha_inicial; // assign to the local object  
            _this.inter = resp.fecha_intermedio; // assign to the local object  
            _this.final = resp.fecha_final; // assign to the local object        
            _this._settingsService.getPeriodById(resp.periodo_actual).subscribe(// get the status
            function (// get the status
                resp) {
                console.log('El req de periodo');
                // console.log('Eso seria');
                _this.periodo = resp; // assign to the local object   
                console.log(_this.periodo);
            });
        });
        $.getScript('../../../../assets/js/plugins/bootstrap-datetimepicker.js');
        initDatetimepickers();
    };
    SettingsAdminComponent.prototype.checkChanges = function (identification) {
        var _this = this;
        swal({
            title: '¿Está seguro?',
            text: "Realizar cambios!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            buttonsStyling: false
        }).then(function () {
            swal({
                title: 'Acción realizada!',
                text: 'Los cambios serán efectuados de manera permanente.',
                type: 'success',
                allowOutsideClick: false,
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            });
        }).then(function () {
            var obj = {
                "fecha_inicial": _this.initial,
                "fecha_intermedio": _this.inter,
                "fecha_final": _this.final
            };
            if (identification == "initFlag") {
                _this.initial = $('#initial').val();
                obj.fecha_inicial = _this.initial;
                console.log(obj);
                _this._settingsService.changeDates(obj).subscribe(// get the details
                function (// get the details
                    resp) {
                    console.log(resp);
                });
            }
            if (identification == "interFlag") {
                _this.inter = $('#inter').val();
                obj.fecha_intermedio = _this.inter;
                _this._settingsService.changeDates(obj).subscribe(// get the details
                function (// get the details
                    resp) {
                    console.log(resp);
                });
                ;
            }
            if (identification == "finFlag") {
                _this.final = $('#final').val();
                obj.fecha_final = _this.final;
                _this._settingsService.changeDates(obj).subscribe(// get the details
                function (// get the details
                    resp) {
                    console.log(resp);
                });
                ;
            }
            if (identification == "periodo") {
                // this.periodo = $('#periodo').val();
                console.log(_this.periodo);
                _this._settingsService.changePeriod(_this.periodo).subscribe(// get the details
                function (// get the details
                    resp) {
                    console.log(resp);
                });
                ;
            }
        }).catch(function () {
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
    SettingsAdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'settingsAdmin-cmp',
            templateUrl: 'settingsAdmin.component.html',
            providers: [settings_service_1.SettingsService]
        }), 
        __metadata('design:paramtypes', [settings_service_1.SettingsService])
    ], SettingsAdminComponent);
    return SettingsAdminComponent;
}());
exports.SettingsAdminComponent = SettingsAdminComponent;
//# sourceMappingURL=settingsAdmin.component.js.map