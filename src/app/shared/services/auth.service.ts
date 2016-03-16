import { Injectable, Output, EventEmitter } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { IUserSecurity, IUserLogin } from '../interfaces.ts';

//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';


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
    
    constructor(private http: Http) { }
    
    login(userLogin: IUserLogin) {
        const postBody: string = JSON.stringify({ userLogin: userLogin }); 
        
        return this.http.post(this.serviceBase + 'login', postBody)
            .map((res: Response) => {
                const loggedIn = res.json();
                this.changeAuth(loggedIn);
                return loggedIn;
            })
            .catch(this.handleError);
    }
    
    logout() {
        return this.http.post(this.serviceBase + 'logout', null)
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
        this.authChanged.emit(true); //Raise authChanged event
    }
    
    handleError(error: any) {
        console.error('Error: ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
