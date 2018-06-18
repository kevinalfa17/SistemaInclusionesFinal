import { Component, OnInit } from '@angular/core';
import { AppealsService } from '../../services/appeals.service';
import { CursesService } from '../../services/curses.service';

@Component({
    moduleId: module.id,
    selector: 'table-apelacion-Admin-cmp',
    templateUrl: 'tableApelacion.component.html',
    providers: [AppealsService] // the provider of request
})

export class TableapelacionAdminComponent implements OnInit {

    dataServerRequest: any;   // Data from the server request
    dataServerCurses: any;   // Data from the server request
    data = [[]];         //List of rows (arrays) with all data
    structure = {};    //Structure of the table


    constructor(private _apelacionService: AppealsService) { }


    ngOnInit() {

        this._apelacionService.getAllInclu().subscribe(  // get the details
            resp => {

                // console.log(resp);

                this.dataServerRequest = resp; // assign to the local object
                this.orderData(this.dataServerRequest, "Inclusión");

                this._apelacionService.getAllReq().subscribe(  // get the details
                    resp2 => {
                        // console.log(resp2);
                        this.dataServerRequest = resp2; // assign to the local object
                        this.orderData(this.dataServerRequest, "Levantamiento Requisito");


                        this._apelacionService.getAllReqRN().subscribe(  // get the details
                            resp3 => {
                                // console.log(resp3);
                                this.dataServerRequest = resp3; // assign to the local object
                                this.orderData(this.dataServerRequest, "Levantamiento Requisito RN");
                                this.data.pop();
                            }
                        );
                    }
                );
            }
        );

        this.structure = { // the array of the structure of the header to use in the table
            columns: [
                { name: "Carné", type: "number", editable: false },
                { name: "Servicio", type: "text", editable: false },
                { name: "Detalles", type: "link2", linkText: "Ver solicitud", editable: false },
            ]
            , header: true, footer: false, edit: false, delete: true
        };
    }

    /**
     * Function ugetAllReqRNsed to order the data from the server
     * @param array All the data to order
     */
    orderData(array, tipo) {

        var le = this.data.length - 1;

        for (var i = 0; i < array.length; i++) {
            var o = le + i;
            this.data[o] = [array[i].estudiante, tipo, "/#/admin/apelacion/" + array[i].id + "/" + tipo];
            this.data.push([]);
        }
    }

    generateReport() {
        console.log("Generando reportes");
    }
}
