import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent }   from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboardAdmin/dashboardAdmin.component';
import { DashboardComComponent } from './dashboardCom/dashboardCom.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardAdminModule } from './dashboardAdmin/dashboardAdmin.module';
import { DashboardComModule } from './dashboardCom/dashboardCom.module';

import { SidebarModule } from './sidebar/sidebar.module';
import { SidebarAdminModule } from './sidebar/sidebarAdmin.module';
import { SidebarComModule } from './sidebar/sidebarCom.module';

import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ServerService } from './shared/server.service';

//Components and routes from routing file
import { MODULE_ROUTES, MODULE_COMPONENTS } from './app.routes';
import { FormsModule } from '@angular/forms';
import { TableModule } from './shared/table/table.module';
import { TextMaskModule } from 'angular2-text-mask';





@NgModule({
    imports:      [
        BrowserModule,
        TextMaskModule,
        DashboardModule,
        DashboardAdminModule,
        DashboardComModule,
        SidebarModule,
        SidebarAdminModule,
        SidebarComModule,

        NavbarModule,
        FooterModule,
        HttpModule,
        FormsModule,
        TableModule,
        RouterModule.forRoot(MODULE_ROUTES)
    ],
    declarations: [ AppComponent, DashboardComponent, DashboardAdminComponent, DashboardComComponent, MODULE_COMPONENTS],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ServerService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
