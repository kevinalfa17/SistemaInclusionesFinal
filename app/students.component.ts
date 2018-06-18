import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'students-cmp',
    templateUrl: 'students.component.html'    
})

export class StudentsComponent implements OnInit {


    constructor(private router: Router){
        
    }


    ngOnInit(): void {
        if(Cookie.get("carne") == null){
           this.router.navigate(['/login']);
        }
    }

   

}