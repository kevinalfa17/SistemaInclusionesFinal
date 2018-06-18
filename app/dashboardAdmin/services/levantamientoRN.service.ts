import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


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

    }

    /**
     *  Check all the parameters of a requirements RN
     * @param id The identification of the request
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRN/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

    }

    /**
     * Delete a requirements RN by their identification
     * @param id The identification of the inclusion
     */
    deleteByID(id) {
        console.log(' Delete the levantamiento  ' + id);
    }
}