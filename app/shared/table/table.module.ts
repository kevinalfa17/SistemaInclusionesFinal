import { NgModule, IterableDiffers }       from '@angular/core';
import { TableComponent } from './table.component';

import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';






@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule
    ],
    declarations: [
      TableComponent

    ],
    providers: [
    ],
    exports: [
      TableComponent
    ]
})
export class TableModule {}