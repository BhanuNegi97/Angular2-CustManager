import { Component, OnInit } from 'angular2/core';
import { RouterLink, Router, Location } from 'angular2/router';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.component.html',
  directives: [RouterLink]
})
export class NavbarComponent implements OnInit {
    
    loginLogoutText: string = 'Login';
    isCollapsed: boolean = false;
	
    constructor(private _authService: AuthService, 
                private _router: Router, 
                private _location: Location) {}
    
    ngOnInit() {
        this.setLoginLogoutText(this._authService.user.isAuthenticated);
      
        //Subscribe to events
        this._authService.loginRequired.subscribe(() => {
            this.redirectToLogin();
        });
        
        this._authService.authChanged.subscribe((loggedIn: boolean) => {
            this.setLoginLogoutText(loggedIn);
        });
    }
    
    loginOrOut() {
        const isAuthenticated = this._authService.user.isAuthenticated;
        if (isAuthenticated) { //logout 
            this.setLoginLogoutText(isAuthenticated);
            this._authService.logout().subscribe((loggedOut: boolean) => {
                this.setLoginLogoutText(!loggedOut);
                this._router.navigate(['Customers']);
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
        this._router.navigate(['Login']);
    }
    
    highlight(path: string) {
        return this._location.path() === path;
    }
}
