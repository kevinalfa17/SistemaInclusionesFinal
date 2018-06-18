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
var inclusions_service_1 = require('../../services/inclusions.service');
var curses_service_1 = require('../../services/curses.service');
var TableInclusionesComComponent = (function () {
    function TableInclusionesComComponent(_inclusionsService, _cursesService) {
        this._inclusionsService = _inclusionsService;
        this._cursesService = _cursesService;
        this.data = [[]]; //List of rows (arrays) with all data
        this.dataLength = 0;
        this.structure = {}; //Structure of the table
    }
    TableInclusionesComComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._inclusionsService.getAll().subscribe(// get the details
        function (// get the details
            resp) {
            _this.dataServerInclusions = resp; // assign to the local object
            console.log(resp);
            _this._cursesService.getAll().subscribe(// get the details
            function (// get the details
                resp2) {
                _this.dataServerCurses = resp2; // assign to the local object
                _this.orderData(_this.dataServerInclusions);
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
    TableInclusionesComComponent.prototype.orderData = function (array) {
        for (var i = 0; i < array.length; i++) {
            this.data[i].push(array[i].estudiante);
            // for (var j = 0; j < this.dataServerCurses.length; j++) {
            //     if (this.dataServerCurses[j].id == array[i].id) {
            //         this.data[i].push(this.dataServerCurses[j].codigo + " " + this.dataServerCurses[j].nombre);
            //     }
            // }
            // this.data[i].push("com/inclusiones/" + array[i].identificacion);
            this.data[i].push(array[i].curso);
            this.data[i].push("/#/com/inclusiones/" + array[i].id);
            this.data.push([]);
        }
        this.data.pop();
    };
    TableInclusionesComComponent.prototype.generateReport = function () {
        console.log("Generando reportes");
    };
    TableInclusionesComComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-Inclusiones-Com-cmp',
            templateUrl: 'tableInclusiones.component.html',
            providers: [inclusions_service_1.InclusionsService, curses_service_1.CursesService] // the provider of inclusions
        }), 
        __metadata('design:paramtypes', [inclusions_service_1.InclusionsService, curses_service_1.CursesService])
    ], TableInclusionesComComponent);
    return TableInclusionesComComponent;
}());
exports.TableInclusionesComComponent = TableInclusionesComComponent;
//# sourceMappingURL=tableInclusiones.component.js.map