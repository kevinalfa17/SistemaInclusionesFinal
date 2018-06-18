import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'userInfoCom-cmp',
    templateUrl: 'userInfoCom.component.html',
    providers: [AuthService, Cookie]
})

export class UserInfoComComponent {

    constructor(private _reqService: AuthService, private router: Router) {

    }

}
