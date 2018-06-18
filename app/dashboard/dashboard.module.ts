import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';



//Components and routes from routing file

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
    declarations: [ CHILD_COMPONENTS]
})

export class DashboardModule { }
