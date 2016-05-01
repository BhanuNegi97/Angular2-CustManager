import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  moduleId: __moduleName,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  directives: [RouterLink]
})
export class NavbarComponent implements OnInit {
    
    loginLogoutText: string = 'Login';
    isCollapsed: boolean = false;
	
    constructor(private authService: AuthService, 
                private router: Router, 
                private location: Location) {}
    
    ngOnInit() {
        this.setLoginLogoutText(this.authService.user.isAuthenticated);
      
        //Subscribe to events
        this.authService.loginRequired.subscribe(() => {
            this.redirectToLogin();
        });
        
        this.authService.authChanged.subscribe((loggedIn: boolean) => {
            this.setLoginLogoutText(loggedIn);
        });
    }
    
    loginOrOut() {
        const isAuthenticated = this.authService.user.isAuthenticated;
        if (isAuthenticated) { //logout 
            this.setLoginLogoutText(isAuthenticated);
            this.authService.logout().subscribe((loggedOut: boolean) => {
                this.setLoginLogoutText(!loggedOut);
                this.router.navigate(['Customers']);
            });
        }
        else {
            this.redirectToLogin();
        }
    };
    
    setLoginLogoutText(loggedIn: boolean) {
        this.loginLogoutText = (loggedIn) ? 'Logout' : 'Login';
    }
    
    redirectToLogin() {
        this.router.navigate(['Login']);
    }
    
    highlight(path: string) {
        return this.location.path() === path;
    }
}
