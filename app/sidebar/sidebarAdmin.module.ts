import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarAdminComponent } from './sidebarAdmin.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarAdminComponent ],
    exports: [ SidebarAdminComponent ]
})

export class SidebarAdminModule {}
