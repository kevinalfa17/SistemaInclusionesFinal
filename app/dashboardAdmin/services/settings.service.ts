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
            "fecha_final": "01/03/2018 10:00 AM", "periodo": "01/02/2018 10:00 AM"
        },
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

    changeDates(newDate) {
        return this._http.put(this._Server.direction + 'ce/Config/Time', newDate).map((res: Response) => res.json());
    }

    changePeriod(newPeriod) {
        return this._http.put(this._Server.direction + 'ce/Config/Period?semester=' + newPeriod.semestre + '&year=' + newPeriod.anno, newPeriod).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    getAllPeriods(): Observable<any> {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);

        return Observable.of(this.obj3[0]);
    }

    /**
     * Get the data of a period
     * @param id The id of the period
     */
    getPeriodById(id) {
        return this._http.get(this._Server.direction + 'ce/Period/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }


}