import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import initDatetimepickers = require('../../../assets/js/init/initDatetimepickers.js');


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SettingsService } from '../services/settings.service'

declare var $: any;
declare var swal: any;
@Component({
    moduleId: module.id,
    selector: 'settingsAdmin-cmp',
    templateUrl: 'settingsAdmin.component.html',
    providers: [SettingsService]
})

export class SettingsAdminComponent implements OnInit {

    private initial: any;
    private inter: any;
    private final: any;
    private periodo: any;
    constructor(private _settingsService: SettingsService) { }

    ngOnInit() {

        this.periodo = { "anno": "", "semestre": "" };
        this._settingsService.getCurrentSettings().subscribe(  // get the details
            resp => {

                console.log(resp);

                this.initial = resp.fecha_inicial; // assign to the local object  
                this.inter = resp.fecha_intermedio; // assign to the local object  
                this.final = resp.fecha_final; // assign to the local object        
                this._settingsService.getPeriodById(resp.periodo_actual).subscribe(  // get the status
                    resp => {
                        console.log('El req de periodo');

                        // console.log('Eso seria');
                        this.periodo = resp; // assign to the local object   
                        console.log(this.periodo);
                    }
                );
            }
        );

        $.getScript('../../../../assets/js/plugins/bootstrap-datetimepicker.js');
        initDatetimepickers();

    }


    checkChanges(identification) {

        swal({
            title: '¿Está seguro?',
            text: "Realizar cambios!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            buttonsStyling: false
        }).then(() => {
            swal({
                title: 'Acción realizada!',
                text: 'Los cambios serán efectuados de manera permanente.',
                type: 'success',
                allowOutsideClick: false,
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            });

        }).then(() => {

            var obj = {
                "fecha_inicial": this.initial,
                "fecha_intermedio": this.inter,
                "fecha_final": this.final
            };

            if (identification == "initFlag") {
                this.initial = $('#initial').val();

                obj.fecha_inicial = this.initial;
                console.log(obj);

                this._settingsService.changeDates(obj).subscribe(  // get the details
                    resp => {
                        console.log(resp);
                    }
                );

            }

            if (identification == "interFlag") {
                this.inter = $('#inter').val();
                obj.fecha_intermedio = this.inter;
                this._settingsService.changeDates(obj).subscribe(  // get the details
                    resp => {
                        console.log(resp);
                    }
                );;
            }
            if (identification == "finFlag") {
                this.final = $('#final').val();
                obj.fecha_final = this.final;
                this._settingsService.changeDates(obj).subscribe(  // get the details
                    resp => {
                        console.log(resp);
                    }
                );;
            }
            if (identification == "periodo") {
                // this.periodo = $('#periodo').val();
                console.log(this.periodo);
                this._settingsService.changePeriod(this.periodo).subscribe(  // get the details
                    resp => {
                        console.log(resp);
                    }
                );;
            }



        }).catch(function () {
            swal({
                title: 'Acción denegada!',
                text: 'Los cambios no serán efectuados.',
                type: 'warning',
                allowOutsideClick: false,
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
            });
        });




    }
}
