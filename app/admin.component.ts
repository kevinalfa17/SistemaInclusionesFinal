import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'admin-cmp',
    templateUrl: 'admin.component.html',
    providers: [Cookie]
})

export class AdminComponent implements OnInit {


    constructor(private router: Router) {

    }

    ngOnInit(): any {
        if (Cookie.get("role1") != "1" ) {
            Cookie.deleteAll();
            this.router.navigate(['loginAdCo']);

        }
    }

}