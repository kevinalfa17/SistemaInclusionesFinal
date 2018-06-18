import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class LevantamientoService {

    constructor(private _Server: ServerService, private _http: Http) { }

    /**
     * Get all the requirements
     */
    getAll(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar
    }

    /**
     *  Check all the parameters of a requirements
     * @param id The identification of the request
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj[0]);
    }

    /**
     * Delete a requirements by their identification
     * @param id The identification of the inclusion
     */
    deleteByID(id) {
        console.log(' Delete the levantamiento  ' + id);
    }

}