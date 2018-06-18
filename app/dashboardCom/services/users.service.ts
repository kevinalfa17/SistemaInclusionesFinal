import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class UsersService {

    constructor(private _Server: ServerService, private _http: Http) { }

    //borrar
    private obj = [
        {
            "primer_nombre": "Mario", "segundo_nombre": "Mario2", "primer_apellido": "Kart", "segundo_apellido": "Kart2",
            "role": 2, "correo_electronico": "km@ggizi.com"
        },
        {
            "primer_nombre": "Mario", "segundo_nombre": "Mario2", "primer_apellido": "Kart", "segundo_apellido": "Kart2",
            "role": 1, "correo_electronico": "km@ggizi.com"
        },
    ];

    //borrar
    private obj2 = [{ "id": 1, "name": "profe", "system": 1, "description": "dan clases" },
    { "id": 2, "name": "estudiante", "system": 1, "description": "van a clases" },
    { "id": 3, "name": "profe no aparecer", "system": 2, "description": "dan clases no aparecer" },
    { "id": 4, "name": "estudiante no aparecer", "system": 2, "description": "van a clases no aparecer" }];

    /**
     *  Check all the parameters of the current configuration
     * @param code The identification of the inclusion
     */
    getAllComUsers(): Observable<any> {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);

        return Observable.of(this.obj); //borrar    
    }

    /**
     * Return a specific user
     * @param id Identificador
     */
    getByID(id): Observable<any> {
        return this._http.get(this._Server.directionUsers + 'ce/Users/' + id).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    editData(id, req) {
        return this._http.put(this._Server.directionUsers + 'ce/Users/' + id, req).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }
    

    /**
     *  Check all the types of roles
     */
    getAllComUsersRoles(): Observable<any> {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);

        return Observable.of(this.obj2); //borrar    
    }

}