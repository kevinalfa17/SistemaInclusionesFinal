import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var swal: any;

@Component({
    moduleId: module.id,
    selector: 'cursos-cmp',
    templateUrl: 'cursos.component.html',
    providers: [RequestService, Cookie]
})

export class CursosComponent implements OnInit {
    data: any;         //List of rows (arrays) with all data
    structure: any;    //Structure of the table
    selectedCourse: number;
    courses: Array<any> = [];
    planData: Array<any> = [];

    constructor(private requestService: RequestService, private router: Router) {
        this.data = [];
        this.structure = { columns: [{ name: "Nombre", type: "text", editable: false }, { name: "Codigo", type: "text", editable: false }, { name: "Creditos", type: "text", editable: false }], header: true, footer: false, edit: false, delete: true };
    }

    ngOnInit(): void {


        this.requestService.getCourses().subscribe(
            data => {
                console.log(data);
                this.courses = data;

                //Get plan
                this.requestService.getPlan(Cookie.get("carne")).subscribe(
                    data => {
                        this.planData = data;
                        this.fillPlan()
                    }), 
                    err => console.log("Error", err);
            }),
            err => console.log("Error", err);
    }

    fillPlan(){

        var row:any;
        for(var i = 0; i < this.planData.length; i++){
            for(var j = 0; j< this.courses.length; j++){
                if(this.planData[i].curso == this.courses[j].codigo){
                    row = [this.courses[j].nombre,this.courses[j].codigo, this.courses[j].creditos];
                }
            }
            this.data.push(row)
        }
    }

    addCourse() {
        var exist = false;
        var i = this.selectedCourse;

        for (var j = 0; j < this.data.length; j++) {
            if (this.courses[i].codigo == this.data[j][1]) {
                exist = true;
            }
        }

        if (!exist) {
            this.data.push([this.courses[i].nombre, this.courses[i].codigo, this.courses[i].creditos]);
        }

    }

    save() {

        swal({
            title: 'Guardando'
        });
        swal.showLoading();

        var request = []

        for (var j = 0; j < this.data.length; j++) {
            var temp = { "estudiante": Cookie.get("carne"), "curso": this.data[j][1], "periodo": 1 }
            request.push(temp)
        }

        console.log("request " + JSON.stringify(request))

        this.requestService.savePlan(request,Cookie.get("carne")).subscribe(
            data => {
                console.log(data);
                swal.close();

                //Guardado!
                swal({
                    title: "Guardado",
                    text: "Su plan de estudios ha sido guardado exitosamente",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                    type: "success"
                })

            }),
            err => console.log("Error", err);

    }

    plan() {
        var myWindow = window.open("plan.html", "", "width=900,height=650");
    }
}
