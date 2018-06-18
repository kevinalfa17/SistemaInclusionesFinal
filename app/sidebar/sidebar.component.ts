import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    name:string;

    constructor(private router: Router){
        
    }

    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);

        let cookie = Cookie.get('nombre');

        if(Cookie.get('nombre') !== null){
            this.name = cookie.split(" ")[0];
        }  
    }

    logout(){
        Cookie.delete("carne");
        Cookie.deleteAll();
        this.router.navigate(['/login']);
        
    }

}
