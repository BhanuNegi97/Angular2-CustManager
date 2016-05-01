import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GrowlerComponent, GrowlMessageType } from '../growler/growler.component';
import { IUserLogin } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  moduleId: __moduleName,
  selector: 'login',
  templateUrl: 'login.component.html',
  directives: [ GrowlerComponent ]
})
export class LoginComponent implements OnInit {
  
  @ViewChild(GrowlerComponent) growler: GrowlerComponent;
  
  userLogin: IUserLogin = {
      email: null,
      password: null
  };
  
  errorMessage: string = null;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
      
  }
  
  onSubmit() {
    this.authService.login(this.userLogin)
        .subscribe((loggedIn: boolean) => {
            if (!loggedIn) {
                this.growler.growl('Unable to login', GrowlMessageType.Danger);
            }
            else {
                this.authService.changeAuth(loggedIn);
                this.router.navigate(['Customers']);
            }            
        });
  }
    
}