import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ServerService } from '../../shared/server.service';

@Injectable()

export class CursesService {

    constructor(private _Server: ServerService, private _http: Http) { }
    
    /**
     * Get all the curses
     */

    getAll(): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Courses').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar    
    }
    /**
     *  Check all the parameters of a curse by id
     * @param code The identification of the curse
     */
    getByID(code): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Courses?code=' + code).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
        // return Observable.of(this.obj[0]); //borrar 
    }

    /**
     * Delete a curse by their identification
     * @param id The identification of the inclusion
     */
    deleteByID(id) {
        console.log(' Delete the inclusion  ' + id);
    }

    /**
     *  Get the curses of the semester
     * @param id The identification of the inclusion
     */
    getByCurriStudent(id): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/CoursePlan?student=' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        // return Observable.of(this.obj); //borrar    
    }

    /**
     * Get all the schools
     */

    getAllSchools(): Observable<any> {

        return this._http.get(this._Server.direction + 'ce/Schools').map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);

        //return Observable.of(this.obj2); //borrar    
    }

    /**
     * Get a school by id
     * @param ID The id of the school
     */

    getSchoolById(ID): Observable<any> {
        return this._http.get(this._Server.direction + 'ce/Schools?code=' + ID).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }
}