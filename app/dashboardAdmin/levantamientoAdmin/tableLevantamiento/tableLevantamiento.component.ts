import { Component, OnInit } from '@angular/core';
import { LevantamientoService } from '../../services/levantamiento.service';
import { CursesService } from '../../services/curses.service';

@Component({
    moduleId: module.id,
    selector: 'table-Levantamiento-Admin-cmp',
    templateUrl: 'tableLevantamiento.component.html',
    providers: [LevantamientoService, CursesService] // the provider of request
})

export class TableLevantamientoComponent implements OnInit {

    dataServerRequest: any;   // Data from the server request
    dataServerCurses: any;   // Data from the server request
    data = [[]];         //List of rows (arrays) with all data
    structure = {};    //Structure of the table


    constructor(private _levantamientoService: LevantamientoService, private _cursesService: CursesService) { }


    ngOnInit() {

        this._levantamientoService.getAll().subscribe(  // get the details
            resp => {
                this.dataServerRequest = resp; // assign to the local object
                console.log(resp);
                console.log('getetet');
                this._cursesService.getAll().subscribe(  // get the details
                    resp2 => {
                        this.dataServerCurses = resp2; // assign to the local object
                        this.orderData(this.dataServerRequest);
                    }
                );
            }
        );

        this.structure = { // the array of the structure of the header to use in the table
            columns: [
                { name: "Carné", type: "number", editable: false },
                { name: "Curso", type: "text", editable: false },
                { name: "Detalles", type: "link2", linkText: "Ver solicitud", editable: false },
            ]
            , header: true, footer: false, edit: false, delete: true
        };
    }

    /**
     * Function used to order the data from the server
     * @param array All the data to order
     */
    orderData(array) {
        for (var i = 0; i < array.length; i++) {

            this.data[i].push(array[i].estudiante);

            // for (var j = 0; j < this.dataServerCurses.length; j++) {
            //     if (this.dataServerCurses[j].id == array[i].curso) {
            //         this.data[i].push(this.dataServerCurses[j].codigo + " " + this.dataServerCurses[j].nombre);
            //     }
            // }
            this.data[i].push(array[i].curso_levantar);
            // console.log(array[i].curso);
            // this.data[i].push("admin/inclusiones/" + array[i].identificacion);
            this.data[i].push("/#/admin/levantamiento/" + array[i].id);
            this.data.push([]);
        }
        this.data.pop();

    }

    generateReport() {
        console.log("Generando reportes");
    }
}
