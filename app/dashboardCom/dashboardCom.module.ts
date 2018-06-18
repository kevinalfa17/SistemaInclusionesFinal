import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


//Components and routes from routing file
import { TableNotificacionesComComponent } from './inicioCom/tableNotificaciones/tableNotificaciones.component';
import { TableInclusionesComComponent } from './inclusionesCom/tableInclusiones/tableInclusiones.component';
import { TableLevantamientoComComponent } from './levantamientoCom/tableLevantamiento/tableLevantamientoCom.component';
import { TableRNComComponent } from './levantamientoRNCom/tableRN/tableRNCom.component';

import { TableModule } from '../shared/table/table.module';

const CHILD_COMPONENTS = [
   
]

@NgModule({
    imports: [
        FormsModule,
        TextMaskModule,
        BrowserModule,
        TableModule,
    ],
    declarations: [CHILD_COMPONENTS]
})

export class DashboardComModule { }
