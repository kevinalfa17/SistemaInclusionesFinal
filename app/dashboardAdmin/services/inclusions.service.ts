import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class InclusionsService {

    constructor(private _Server: ServerService, private _http: Http) { }

    /**
     * Get all the inclusions
     */
    getAll(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Inclusions/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar
    }

    /**
     *  Check all the parameters of an inclusion
     * @param id The identification of the inclusion
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Inclusions/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj[0]);
    }

    /**
     * Get the related 
     * @param id The id of the inclusion 
     */

    getReq(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Inclusions/RelatedSkip?id=' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    /**
     * Delete an inclusion by their identification
     * @param id The identification of the inclusion
     */
    deleteByID(id) {
        console.log(' Delete the inclusion  ' + id);
    }
}