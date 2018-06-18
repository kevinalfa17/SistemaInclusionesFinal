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
var appeals_service_1 = require('../../services/appeals.service');
var curses_service_1 = require('../../services/curses.service');
var TableapelacionComComponent = (function () {
    function TableapelacionComComponent(_apelacionService, _cursesService) {
        this._apelacionService = _apelacionService;
        this._cursesService = _cursesService;
        this.data = [[]]; //List of rows (arrays) with all data
        this.structure = {}; //Structure of the table
    }
    TableapelacionComComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apelacionService.getAllInclu().subscribe(// get the details
        function (// get the details
            resp) {
            // console.log(resp);
            _this.dataServerRequest = resp; // assign to the local object
            _this.orderData(_this.dataServerRequest, "Inclusión");
            _this._apelacionService.getAllReq().subscribe(// get the details
            function (// get the details
                resp2) {
                // console.log(resp2);
                _this.dataServerRequest = resp2; // assign to the local object
                _this.orderData(_this.dataServerRequest, "Levantamiento Requisito");
                _this._apelacionService.getAllReqRN().subscribe(// get the details
                function (// get the details
                    resp3) {
                    // console.log(resp3);
                    _this.dataServerRequest = resp3; // assign to the local object
                    _this.orderData(_this.dataServerRequest, "Levantamiento Requisito RN");
                    _this.data.pop();
                });
            });
        });
        this.structure = {
            columns: [
                { name: "Carné", type: "number", editable: false },
                { name: "Servicio", type: "text", editable: false },
                { name: "Detalles", type: "link2", linkText: "Ver solicitud", editable: false },
            ],
            header: true, footer: false, edit: false, delete: true
        };
    };
    /**
     * Function used to order the data from the server
     * @param array All the data to order
     */
    TableapelacionComComponent.prototype.orderData = function (array, tipo) {
        var le = this.data.length - 1;
        for (var i = 0; i < array.length; i++) {
            var o = le + i;
            this.data[o] = [array[i].estudiante, tipo, "/#/com/apelacion/" + array[i].id + "/" + tipo];
            this.data.push([]);
        }
    };
    TableapelacionComComponent.prototype.generateReport = function () {
        console.log("Generando reportes");
    };
    TableapelacionComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-apelacion-Com-cmp',
            templateUrl: 'tableApelacion.component.html',
            providers: [appeals_service_1.AppealsService, curses_service_1.CursesService] // the provider of request
        }), 
        __metadata('design:paramtypes', [appeals_service_1.AppealsService, curses_service_1.CursesService])
    ], TableapelacionComComponent);
    return TableapelacionComComponent;
}());
exports.TableapelacionComComponent = TableapelacionComComponent;
//# sourceMappingURL=tableApelacion.component.js.map