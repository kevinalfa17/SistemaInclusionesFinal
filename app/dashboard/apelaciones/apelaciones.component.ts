import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
    moduleId: module.id,
    selector: 'apelaciones-cmp',
    templateUrl: 'apelaciones.component.html',
    providers: [RequestService, Cookie]
})

export class ApelacionesComponent implements OnInit {

    data: any = [];         //List of rows (arrays) with all data
    structure: any = {};    //Structure of the table

    data2: any = [];         //List of rows (arrays) with all data
    structure2: any = {};    //Structure of the table

    /*constructor() {
        this.data = [["100","REQ", "2018-01-01","https://www.google.com"], ["101","RN", "2018-01-01","https://www.google.com"]];
        this.structure = {columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "", type: "link", linkText: "Apelar", editable: false }], header: true, footer: false, edit: false, delete: true };

        this.data2 = [["123","REQ", "2018-01-01","En revisión"]];
        this.structure2 = { columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "Estado", type: "text", editable: false }], header: true, footer: false, edit: false, delete: false };
    }*/

    constructor(private requestService: RequestService, private router: Router) {

    }

    ngOnInit(): void {

        this.structure = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "date", editable: false }, { name: "", type: "link", linkText: "Apelar", editable: false }], header: true, footer: false, edit: false, delete: true };
        this.structure2 = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false }, { name: "Estado", type: "text", editable: false }], header: true, footer: false, edit: false, delete: false };

        this.requestService.getInclusion(Cookie.get("carne")).subscribe(
            data => {

                console.log("data1")
                console.log(data);
                this.fillData(data, "inc");

            }),
            err => console.log("Error", err);

        this.requestService.getRequirements(Cookie.get("carne")).subscribe(
            data => {
                console.log("data2")
                console.log(data);
                this.fillData(data, "req");

            }),
            err => console.log("Error", err);

        this.requestService.getRn(Cookie.get("carne")).subscribe(
            data => {
                console.log("data3")
                console.log(data);
                this.fillData(data, "rn");
            }),
            err => console.log("Error", err);

    }

    fillData(object, type: string) {

        console.log("fill")

        for (var i = 0; i < object.length; i++) {
            if (object[i].estado_solicitud == "Rechazado") {
                this.data.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, type + "/" + object[i].id])
            }
            if (object[i].apelacion !== null) {
                this.data2.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, object[i].estado_apelacion])
            }
        }

    }
}
