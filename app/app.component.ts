import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

declare var $:any;
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    constructor(location:Location) {
        this.location = location;
    }
    ngOnInit(){
        $.getScript('../assets/js/init/initMenu.js');
        $.getScript('../assets/js/demo.js');
        $.getScript('../assets/js/toolsAdmin.js');
    }
}
