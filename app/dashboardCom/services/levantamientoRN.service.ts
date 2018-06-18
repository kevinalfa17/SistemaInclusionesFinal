import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class LevantamientoRNService {

    constructor(private _Server: ServerService, private _http: Http) { }
    /**
     * Get all the requirements RN
     */
    getAll(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRN/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar
    }

    /**
     *  Check all the parameters of a requirements RN
     * @param id The identification of the request
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRN/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj[0]);
    }

    /**
     * Delete a requirements RN by their identification
     * @param id The identification of the inclusion
     */
    deleteByID(id) {
        console.log(' Delete the levantamiento  ' + id);
    }

            /**
     * Edit the state of an requirement
     * @param id The id of the inclusion to edit
     * @param request The object with the new parameters
     */
    editAReq(id, request) {
        return this._http.put(this._Server.direction + 'ce/SkipRN/Commission?id=' + id, request).map((res: Response) => res.json());
    }
    
}