import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ServerService } from '../shared/server.service';



@Injectable()

export class AuthService {
    nombre: string = "";
    id: string;
    email: string;

    constructor(private requestService: ServerService, private _http: Http) {
    }

    login(user) {
        return this._http.post(this.requestService.directionUsers + 'ce/UserAuth/Authenticate', user).map((res: Response) => res.json()).catch((err) => {

            // Do messaging and error handling here

            return Observable.throw(err)
        });

    }

}
