import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebarAdmin-routes.config';
import { MenuType } from '../.././sidebar/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { RequestService } from '../../shared/request.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    providers: [RequestService, Cookie]
})

export class NavbarComponent implements OnInit{

    notifications: Array<any> = [];
    size:number = null;
    
    private listTitles: any[];
    location: Location;
    constructor(location:Location, private requestService: RequestService) {
        this.location = location;
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
        this.requestService.getNotifications(Cookie.get("correo")).subscribe(
            data => {
                console.log(data);
                this.notifications = data;
                this.size = this.notifications.length;
            }),
            err => console.log("Error", err);
   
    }
    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){    
            titlee = titlee.slice( 2 );
            var titleTemp = titlee.split("/");
            titlee = ""
            for(var i = 1; i < titleTemp.length; i++){
                titlee = titlee + titleTemp[i];
                if(i !== titleTemp.length-1){
                    titlee = titlee + "/";
                }
            }
        }
        
        titlee = titlee.split( '/' )[1];

        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return titlee;
    }
    getPath(){
        // console.log(this.location);
        return this.location.prepareExternalUrl(this.location.path());
    }
}
