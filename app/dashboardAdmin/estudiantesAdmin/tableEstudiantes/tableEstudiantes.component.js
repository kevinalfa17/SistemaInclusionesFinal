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
var students_service_1 = require('../../services/students.service');
var TableEstudiantesComponent = (function () {
    function TableEstudiantesComponent(_studentsService) {
        this._studentsService = _studentsService;
        this.serverResult = [];
    }
    TableEstudiantesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.structure = {
            columns: [{ name: "Carné", type: "number", editable: true },
                { name: "Primer nombre", type: "text", editable: true },
                { name: "Segundo nombre", type: "text", editable: true },
                { name: "Primer apellido", type: "text", editable: true },
                { name: "Segundo apellido", type: "text", editable: true },
                { name: "Correo", type: "text", editable: true },
            ],
            header: true, footer: false, edit: false, delete: true, create: true, search: true
        };
        this.data = [[]
        ];
        this._studentsService.getAll().subscribe(// get the details
        function (// get the details
            resp) {
            _this.serverResult = resp; // assign to the local object   
            console.log(resp);
            _this.orderData(_this.serverResult);
        });
    };
    TableEstudiantesComponent.prototype.orderData = function (array) {
        for (var i = 0; i < array.length; ++i) {
            this.data[i] = [array[i].carne, array[i].primer_nombre, array[i].segundo_nombre, array[i].primer_apellido,
                array[i].segundo_apellido, array[i].correo_electronico, array[i].carrera, array[i].carrera];
            this.data.push([]);
        }
    };
    TableEstudiantesComponent.prototype.importStudents = function () {
        console.log("Hay q importar");
    };
    TableEstudiantesComponent.prototype.onCreate = function () {
        console.log(this.data[this.data.length]);
    };
    TableEstudiantesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-Estudiantes-Admin-cmp',
            templateUrl: 'tableEstudiantes.component.html',
            providers: [students_service_1.StudentsService]
        }), 
        __metadata('design:paramtypes', [students_service_1.StudentsService])
    ], TableEstudiantesComponent);
    return TableEstudiantesComponent;
}());
exports.TableEstudiantesComponent = TableEstudiantesComponent;
//# sourceMappingURL=tableEstudiantes.component.js.map