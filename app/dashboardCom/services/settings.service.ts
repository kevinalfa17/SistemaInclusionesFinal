import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class SettingsService {

    constructor(private _Server: ServerService, private _http: Http) { }

    //borrar
    private obj = [
        {
            "fecha_inicial": "01/01/2018 10:00 AM", "fecha_intermedio": "01/02/2018 10:00 AM",
            "fecha_final": "01/03/2018 10:00 AM"
        },
    ];

    //borrar
    private obj2 = [
        { "id": "1", "descripcion": "Recibido" }, { "id": "2", "descripcion": "En evaluacion" },
        { "id": "3", "descripcion": "Evaluado" }, { "id": "4", "descripcion": "Pendiente de notificarse" },
        { "id": "5", "descripcion": "Aprobado" }, { "id": "6", "descripcion": "Rechazado" }, { "id": "7", "descripcion": "Requiere valoracion de consejo" }
    ];

    //borrar
    private obj3 = [
        { "anno": "1", "semestre": "4" },
        { "anno": "5", "semestre": "2" }
    ];


    /**
     *  Check all the paramters of the current configuration
     * @param code The identification of the inclusion
     */
    getCurrentSettings(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Config').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar    
    }

    // changeInitialDate(newDate) {
    //     console.log("VAMOS A LA BASE A PONER DE FECHA INICIAL " + newDate);
    // }

    // changeInterDate(newDate) {
    //     console.log("VAMOS A LA BASE A PONER DE FECHA INTERMEDIA " + newDate);
    // }

    // changeFinalDate(newDate) {
    //     console.log("VAMOS A LA BASE A PONER DE FECHA FINAL " + newDate);
    // }

    /**
     * Return all the possibles status for a service
     */
    getStatusServices(): Observable<any> {
        return Observable.of(this.obj2);
    }
    /**
 * Return all the possibles status for a service
 */
    getCheckEntityServices(): Observable<any> {
        return Observable.of(this.obj2);
    }

    getPeriodById(id): Observable<any>{
        return this._http.get(this._Server.direction + 'ce/Period/'+id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }
}