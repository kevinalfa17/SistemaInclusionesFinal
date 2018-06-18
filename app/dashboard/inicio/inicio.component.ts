import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'inicio-cmp',
    templateUrl: 'inicio.component.html' 
})

export class InicioComponent {
    
    data: any;         //List of rows (arrays) with all data
    structure: any;    //Structure of the table

    constructor(){
        this.data = [["b","11111","2018-01-01","https://www.google.com"],["z","22222","2018-01-02","https://wwww.facebook.com"],["a","33333","2018-01-03","https://www.gmail.com"]];
        this.structure = {columns:[{name: "Texto", type:"text", editable: true},{name: "Number", type:"number", editable: true},{name: "Fecha", type:"date", editable: true},
        {name: "Link", type:"link",linkText:"Ver", editable: true}],header:true,footer:false, edit: false, delete: true, search: true, sort:true, create:true, pagination:false};
    }

}
