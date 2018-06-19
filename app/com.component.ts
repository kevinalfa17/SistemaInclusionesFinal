import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'com-cmp',
    templateUrl: 'com.component.html'
})

export class ComComponent implements OnInit {


    constructor(private router: Router) {
    }

    ngOnInit(): any {
        if ((Cookie.get("role2") != "3") || ( (Cookie.get("role2") != "3") && (Cookie.get("role2") != "1"))) {
            Cookie.deleteAll();
            this.router.navigate(['loginAdCo']);

        }
        if ((Cookie.get("role2") != "3") || ( (Cookie.get("role2") == "1") )) {
            Cookie.deleteAll();
            this.router.navigate(['loginAdCo']);

        }
    }

}