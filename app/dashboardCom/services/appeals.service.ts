import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class AppealsService {

    constructor(private _Server: ServerService, private _http: Http) { }

    getAllInclu(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Inclusions/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    getAllReq(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRequirements/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    getAllReqRN(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/SkipRN/Sent').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    /**
     *  Check all the parameters of an inclusion
     * @param id The identification of the inclusion
     * @param tipo El tipo de solicitud
     */
    getByID(id, tipo): Observable<any> {
        var connectionString = "";

        console.log(id, tipo);

        if (tipo == 'Inclusión') {
            connectionString = "Inclusions";
        }
        if (tipo == 'Levantamiento Requisito') {
            connectionString = "SkipRequirements";
        }
        if (tipo == 'Levantamiento Requisito RN') {
            connectionString = "SkipRN";
        }

        return this._http.get(this._Server.direction + 'ce/' + connectionString + '/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    /**
     *  Check all the parameters of an inclusion
     * @param id The identification of the inclusion
     * @param tipo The type
     * @param req The object with the json
     */
    editAppeal(id, tipo, req) {
        var connectionString = "";

        console.log(id, tipo);

        if (tipo == 'Inclusión') {
            connectionString = "Inclusions";
        }
        if (tipo == 'Levantamiento Requisito') {
            connectionString = "SkipRequirements";
        }
        if (tipo == 'Levantamiento Requisito RN') {
            connectionString = "SkipRN";
        }

        return this._http.put(this._Server.direction + 'ce/' + connectionString + '//Appeal?id=' + id, req).map(
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