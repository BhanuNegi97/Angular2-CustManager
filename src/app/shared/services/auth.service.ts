import { Injectable, Output, EventEmitter } from 'angular2/core';
import { Http, Response } from 'angular2/http';
//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IUserSecurity, IUserLogin } from '../interfaces.ts';
import { LogService } from './log.service';
import { HttpUtils } from '../utils/httpUtils';

@Injectable()
export class AuthService {
  
    serviceBase: string = '/api/dataservice/';
    
    user: IUserSecurity = {
        isAuthenticated: false,
        roles: null
    };
    
    @Output()
    loginRequired: EventEmitter<{}> = new EventEmitter<{}>();
    
    @Output()
    authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    constructor(private _http: Http, private _httpUtils: HttpUtils, private _logService: LogService) { }
    
    login(userLogin: IUserLogin) {
        const postBody: string = JSON.stringify({ userLogin: userLogin }); 
        
        return this._http.post(this.serviceBase + 'login', postBody, this._httpUtils.getJsonRequestOptions())
            .map((res: Response) => {
                const loggedIn = res.json();
                this.changeAuth(loggedIn);
                return loggedIn;
            })
            .catch(this.handleError);
    }
    
    logout() {
        return this._http.post(this.serviceBase + 'logout', null, this._httpUtils.getJsonRequestOptions())
            .map((res: Response) => {
                const status = res.json();
                const loggedIn = !status;
                this.changeAuth(loggedIn);
                return loggedIn;
            })
            .catch(this.handleError);
    }
    
    redirectToLogin() {
        this.loginRequired.emit({}); //Raise loginRequired event
    }

    changeAuth(loggedIn: boolean) {
        this.user.isAuthenticated = loggedIn;
        this.authChanged.emit(loggedIn); //Raise authChanged event
    }
    
    handleError(error: any) {
        this._logService.log('Error: ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
