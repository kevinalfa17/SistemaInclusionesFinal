import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebarAdmin-routes.config';
import { MenuType } from './sidebar.metadata';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'sidebarAdmin-cmp',
    templateUrl: 'sidebarAdmin.component.html',
})

export class SidebarAdminComponent implements OnInit {
    public menuItems: any[];

    userInfo = { "idUser": "", "correo": "", "nombre": "", "role1": "", "role2": "" };

    ngOnInit() {
        $.getScript('../../assets/js/sidebar-moving-tab.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
        // console.log( Cookie.get("correo") );
        this.userInfo.nombre = Cookie.get("nombre");
    }

    deleteCookies(){
        Cookie.deleteAll();
    }

}
