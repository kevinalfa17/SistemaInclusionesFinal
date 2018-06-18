import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebarCom-routes.config';
import { MenuType } from './sidebar.metadata';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebarCom-cmp',
    templateUrl: 'sidebarCom.component.html',
})

export class SidebarComComponent implements OnInit {
    public menuItems: any[];

    userInfo = { "idUser": "", "correo": "", "nombre": "", "role1": "", "role2": "" };

    
    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');

        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
        
        this.userInfo.nombre = Cookie.get("nombre");

    }

    deleteCookies(){
        Cookie.deleteAll();
    }

}
