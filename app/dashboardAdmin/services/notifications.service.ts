import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import "rxjs/add/observable/of";  //borrar

import { ServerService } from '../../shared/server.service';

@Injectable()

export class NotificationsService {

    constructor(private _Server: ServerService, private _http: Http) { }

    // borrar
    private obj = [
        {"id": 0, "tipo":"inc", "estudiante": 2015104425, "descripcion":" algun lugar gg", "leido": false, "idService": 0 },
        {"id": 10, "tipo":"req", "estudiante": 2015104425, "descripcion":" algun lugar gg2", "leido": false, "idService": 1 },
        {"id": 55, "tipo":"reqRN", "estudiante": 2015104425, "descripcion":" algun lugar gg3", "leido": false, "idService": 2 },
        {"id": 55, "tipo":"reqRN", "estudiante": 2015104425, "descripcion":" algun lugar gg3", "leido": false, "idService": 2 },
        {"id": 55, "tipo":"ape", "estudiante": 2015104425, "descripcion":" algun lugar gg3", "leido": false, "idService": 2 },

        {
            "id": 1,
            "tipo": "sample string 3",
            "descripcion": "sample string 6",

            
            "visto": true,

            "fecha": "2018-06-17T00:08:23.6638686-06:00",
            "correo_electronico": "sample string 5",
          }

    ];


    getAll(): Observable<any> {
        //this._http.get('');

        return Observable.of(this.obj); //borrar
    }


    getByID(id): Observable<any> {
        //this._http.get('');
        console.log(' You want the inclusion  ' + id);


        return Observable.of(this.obj); //borrar
    }

    changeState(id, state){
        console.log("cambiar el estado de"+ id + " a: "+state);
    }

    deleteByID(id) {
        console.log(' Delete the inclusion  ' + id);
    }

    createNotiEmail(not){

    }

}