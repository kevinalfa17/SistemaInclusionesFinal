import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class StudentsService {
    // private obj = [{
    //     "carne":2015104425,"primer_nombre": "Gabriel", "segundo_nombre": "Gab", "primer_apellido": "Barboza", "segundo_apellido": "Alvarez",
    //     "correo_electronico": "gbarboza963@gmail.com", "carrera": 1}
    // ];
    constructor(private _Server: ServerService, private _http: Http) { }

    /**
     *  Get the information of an specific student
     * @param id The identification of the student
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.directionUsers + 'ce/Students/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    deleteByID(id) {
        console.log(' Delete the inclusion  ' + id);
    }

}