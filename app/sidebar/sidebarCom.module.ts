import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComComponent } from './sidebarCom.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComComponent ],
    exports: [ SidebarComComponent ]
})

export class SidebarComModule {}
