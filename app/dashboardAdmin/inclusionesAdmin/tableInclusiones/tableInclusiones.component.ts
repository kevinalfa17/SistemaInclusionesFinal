import { Component, OnInit } from '@angular/core';
import { InclusionsService } from '../../services/inclusions.service';
import { CursesService } from '../../services/curses.service';
import { ReportsService } from '../../services/report.service';


@Component({
    moduleId: module.id,
    selector: 'table-Inclusiones-Admin-cmp',
    templateUrl: 'tableInclusiones.component.html',
    providers: [InclusionsService, CursesService, ReportsService] // the provider of inclusions
})

export class TableInclusionesAdminComponent implements OnInit {

    dataServerInclusions: any;   // Data from the server inclusion
    dataServerCurses: any;   // Data from the server inclusion
    data = [[]];         //List of rows (arrays) with all data
    dataLength = 0;
    structure = {};    //Structure of the table
    constructor(private _inclusionsService: InclusionsService, private _cursesService: CursesService, private _reportService: ReportsService) { }


    ngOnInit() {

        this._inclusionsService.getAll().subscribe(  // get the details
            resp => {
                console.log(resp);
                // console.log('El req');
                // console.log(resp);
                // console.log('Eso seria');
                this.dataServerInclusions = resp; // assign to the local object

                this._cursesService.getAll().subscribe(  // get the details
                    resp2 => {
                        this.dataServerCurses = resp2; // assign to the local object
                        this.orderData(this.dataServerInclusions);
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
            //     if (this.dataServerCurses[j].id == array[i].id) {
            //         this.data[i].push(this.dataServerCurses[j].codigo + " " + this.dataServerCurses[j].nombre);
            //     }
            // }
            this.data[i].push(array[i].curso);
            this.data[i].push("/#/admin/inclusiones/" + array[i].id);
            this.data.push([]);

        }
        this.data.pop();
    }

    generateReport() {
        // console.log("Generando reportes");

        var j = [{ 'nombre': 'jj' }, { "este": "men" }];

        this._reportService.exportAsExcelFile(j, '/home/gabriel/Escritorio/gba');
    }

}
