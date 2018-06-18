import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class StudentsService {

    constructor(private _Server: ServerService, private _http: Http) { }

    /**
     * Get all the students
     */
    getAll(): Observable<any> {
        return this._http.get(this._Server.directionUsers + 'ce/Students').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    updateAll() {

    }

    /**
     *  Get the information of an specific student
     * @param id The identification of the student
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.directionUsers + 'ce/Students/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    /**
     * Delete one student by id
     * @param id The id of the student
     */
    deleteByID(id) {
        console.log(' Delete the inclusion  ' + id);
    }

}