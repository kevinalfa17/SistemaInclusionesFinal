import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';

@Component({
    moduleId: module.id,
    selector: 'table-Estudiantes-Admin-cmp',
    templateUrl: 'tableEstudiantes.component.html',
    providers: [StudentsService]
})

export class TableEstudiantesComponent implements OnInit {

    serverResult = [];
    data: any;         //List of rows (arrays) with all data
    structure: any;    //Structure of the table

    constructor(private _studentsService: StudentsService) { }

    ngOnInit() {
        this.structure = {
            columns: [{ name: "Carné", type: "number", editable: true },
            { name: "Primer nombre", type: "text", editable: true },
            { name: "Segundo nombre", type: "text", editable: true },
            { name: "Primer apellido", type: "text", editable: true },
            { name: "Segundo apellido", type: "text", editable: true },

            { name: "Correo", type: "text", editable: true },
                // { name: "Celular", type: "number", editable: true },

                // { name: "Carrera", type: "text", editable: true },

                //{ name: "Telefono", type: "number", editable: true },
                //{ name: "Ponderado", type: "number", editable: true },
                //{ name: "Cita Matricula", type: "number", editable: true },
            ]
            , header: true, footer: false, edit: false, delete: true
        };

        this.data = [[]
            // ["2015104425", "Gabriel", "Gabriel", "Barboza", "Alvarez", "gbarboza963@gmail.com", "87362890", "Computadores"],
            //["0000000000", "Defecto", "Defecto", "Defecto", "Defecto", "Defecto@Defecto.Defecto", "00000000", "Defecto", "Defecto"]

        ];

        // {
        //     "carne": 47, "primer_nombre": "toto", "segundo_nombre": "", "primer_apellido": "cuco", "segundo_apellido": "lolo",
        //     "correo_electronico": "gb3@gmail.com", "carrera": 1
        // }

        this._studentsService.getAll().subscribe(  // get the details
            resp => {
                this.serverResult = resp; // assign to the local object   
                console.log(resp);
                this.orderData(this.serverResult);
            }
        );
    }

    orderData(array) {

        for (var i = 0; i < array.length; ++i) {

            this.data[i] = [array[i].carne, array[i].primer_nombre, array[i].segundo_nombre, array[i].primer_apellido,
            array[i].segundo_apellido, array[i].correo_electronico, array[i].carrera, array[i].carrera];
            this.data.push([]);

        }

    }

    importStudents() {
        console.log("Hay q importar");
    }
}
