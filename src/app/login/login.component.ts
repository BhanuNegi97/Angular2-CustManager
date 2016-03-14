import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { IUserLogin } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  selector: 'login',
  templateUrl: 'app/login/login.component.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
    
    userLogin: IUserLogin = {
        email: null,
        password: null
    };
    
    errorMessage: string = null;
    
    constructor(private authService: AuthService) {}
    
    ngOnInit() {
        
    }
    
    onSubmit() {
        this.authService.login(this.userLogin)
            .subscribe((loggedIn: boolean) => {
                if (!loggedIn) {
                    this.errorMessage = 'Unable to login';
                }
                else {
                    this.authService.changeAuth(loggedIn);
                }
                
            });
    }
    
}