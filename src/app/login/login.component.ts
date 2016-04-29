import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GrowlerComponent, GrowlMessageType } from '../growler/growler.component';
import { IUserLogin } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  selector: 'login',
  templateUrl: 'app/login/login.component.html',
  directives: [ GrowlerComponent ]
})
export class LoginComponent implements OnInit {
  
  @ViewChild(GrowlerComponent) _growler: GrowlerComponent;
  
  userLogin: IUserLogin = {
      email: null,
      password: null
  };
  
  errorMessage: string = null;
  
  constructor(private _authService: AuthService, private _router: Router) {}
  
  ngOnInit() {
      
  }
  
  onSubmit() {
    this._authService.login(this.userLogin)
        .subscribe((loggedIn: boolean) => {
            if (!loggedIn) {
                this._growler.growl('Unable to login', GrowlMessageType.Danger);
            }
            else {
                this._authService.changeAuth(loggedIn);
                this._router.navigate(['Customers']);
            }            
        });
  }
    
}