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
            "role": 2, "correo_electronico": "km@ggizi.com", "contrasenna": ""
        },
        {
            "primer_nombre": "Mario", "segundo_nombre": "Mario2", "primer_apellido": "Kart", "segundo_apellido": "Kart2",
            "role": 1, "correo_electronico": "km@ggizi.com", "contrasenna": ""
        },
    ];

    //borrar
    private obj2 = [{ "id_rol": 1, "nombre": "profe", "sistema": 1 },
    { "id_rol": 2, "nombre": "estudiante", "sistema": 1 },
    { "id_rol": 3, "nombre": "profe no aparecer", "sistema": 2 },
    { "id_rol": 4, "nombre": "estudiante no aparecer", "sistema": 2 }];

    login(request) {
        return this._http.post(this._Server.directionUsers + '/ce/StudentAuth/Authenticate', request).map((res: Response) => res.json());
    }


    /**
     *  Check all the parameters of the current configuration
     * @param code The identification of the inclusion
     */
    getAllAdminUsers(): Observable<any> {
        // return this._http.get(this._Server.direction + 'ce/Users/').map(
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

    // changeUser(id, req) {
    //     return this._http.put(this._Server.direction + 'ce/Users/' + id, req).map(
    //         (res: Response) => res.json()
    //     ).catch(this._Server.handleError);
    // }

    editData(id, req) {
        return this._http.put(this._Server.directionUsers + 'ce/Users/' + id, req).map(
            (res: Response) => res.json()
        ).catch(this._Server.handleError);
    }

    /**
     *  Check all the types of roles
     */
    getAllAdminUsersRoles(): Observable<any> {
        // return this._http.get(this._Server.direction + 'ce/Courses?code={' + code + '}').map(
        //     (res: Response) => res.json()
        // ).catch(this._Server.handleError);

        return Observable.of(this.obj2); //borrar    
    }

    registerUserAdmin(user) {
        console.log(" Vamos a registrar al men o mena " + user);
    }

    changeRoles(id, roles) {
        console.log(roles);
    }

    addRole(newRole) {
        console.log(newRole);
    }


}