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
var levantamiento_service_1 = require('../../services/levantamiento.service');
var curses_service_1 = require('../../services/curses.service');
var TableLevantamientoComComponent = (function () {
    function TableLevantamientoComComponent(_levantamientoService, _cursesService) {
        this._levantamientoService = _levantamientoService;
        this._cursesService = _cursesService;
        this.data = [[]]; //List of rows (arrays) with all data
        this.structure = {}; //Structure of the table
    }
    TableLevantamientoComComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._levantamientoService.getAll().subscribe(// get the details
        function (// get the details
            resp) {
            _this.dataServerRequest = resp; // assign to the local object
            console.log(resp);
            console.log('getetet');
            _this._cursesService.getAll().subscribe(// get the details
            function (// get the details
                resp2) {
                _this.dataServerCurses = resp2; // assign to the local object
                _this.orderData(_this.dataServerRequest);
            });
        });
        this.structure = {
            columns: [
                { name: "Carné", type: "number", editable: false },
                { name: "Curso", type: "text", editable: false },
                { name: "Detalles", type: "link2", linkText: "Ver solicitud", editable: false },
            ],
            header: true, footer: false, edit: false, delete: true
        };
    };
    /**
     * Function used to order the data from the server
     * @param array All the data to order
     */
    TableLevantamientoComComponent.prototype.orderData = function (array) {
        for (var i = 0; i < array.length; i++) {
            this.data[i].push(array[i].estudiante);
            // for (var j = 0; j < this.dataServerCurses.length; j++) {
            //     if (this.dataServerCurses[j].id == array[i].curso) {
            //         this.data[i].push(this.dataServerCurses[j].codigo + " " + this.dataServerCurses[j].nombre);
            //     }
            // }
            this.data[i].push(array[i].curso_levantar);
            // this.data[i].push("com/inclusiones/" + array[i].identificacion);
            this.data[i].push("/#/com/levantamiento/" + array[i].id);
            this.data.push([]);
        }
        this.data.pop();
    };
    TableLevantamientoComComponent.prototype.generateReport = function () {
        console.log("Generando reportes");
    };
    TableLevantamientoComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-Levantamiento-Com-cmp',
            templateUrl: 'tableLevantamientoCom.component.html',
            providers: [levantamiento_service_1.LevantamientoService, curses_service_1.CursesService] // the provider of request
        }), 
        __metadata('design:paramtypes', [levantamiento_service_1.LevantamientoService, curses_service_1.CursesService])
    ], TableLevantamientoComComponent);
    return TableLevantamientoComComponent;
}());
exports.TableLevantamientoComComponent = TableLevantamientoComComponent;
//# sourceMappingURL=tableLevantamientoCom.component.js.map