import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'solicitudes-cmp',
    templateUrl: 'solicitudes.component.html',
    providers: [RequestService, Cookie]
})

export class SolicitudesComponent implements OnInit {

    data: any = [];         //List of rows (arrays) with all data
    structure: any = {};    //Structure of the table
    inclusions: Array<any> = [];
    req: Array<any> = [];
    rn: Array<any> = [];


    /*constructor() {
        this.data = [["130","REQ", "2018-01-01","Enviado","inc/1"], ["131","RN", "2018-01-01","Guardado","req/2"], ["132","INC", "2018-01-01","Guardado","rn/4"]];
        this.structure = {columns: [{name: "N°", type:"number", min: 0 , max: 100000, editable: false},{ name: "Formulario", type: "text", editable: false }, { name: "Fecha", type: "text", editable: false },{ name: "Estado", type: "text", editable: false }, { name: "", type: "link", linkText: "Ver", editable: false }], header: true, footer: false, edit: false, delete: true };
    }*/

    constructor(private requestService: RequestService, private router: Router) {

    }

    ngOnInit(): void {

        this.structure = { columns: [{ name: "N°", type: "number", min: 0, max: 100000, editable: false }, { name: "Formulario", type: "text", editable: false }, { name: "Fecha Envio", type: "date", editable: false }, { name: "Estado", type: "text", editable: false }, { name: "", type: "link", linkText: "Ver", editable: false }], header: true, footer: false, edit: false, delete: true };


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
            this.data.push([object[i].id, type.toUpperCase(), object[i].fecha_solicitud, object[i].estado_solicitud, type + "/" + object[i].id])
        }

    }

    onDelete(e) {
        console.log("deleted" + e)
        var formId = this.data[e][0];
        var formType = this.data[e][1];

        console.log(formId)
        console.log(formType)

        switch (formType) {
            case "INC":
                this.requestService.deleteInclusion(formId).subscribe(
                    data => {
                        //console.log(data);
                    }),
                    err => console.log("Error", err);
                break;
            case "REQ":
                this.requestService.deleteRequirements(formId).subscribe(
                    data => {
                        //console.log(data);
                    }),
                    err => console.log("Error", err);
                break;
            case "RN":
                this.requestService.deleteRn(formId).subscribe(
                    data => {
                        //console.log(data);
                    }),
                    err => console.log("Error", err);
                break;

        }
    }


}
