import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, Router, Location } from 'angular2/router';
import { AuthService } from '../shared/services/auth.service';

@Component({ 
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.component.html',
  directives: [CORE_DIRECTIVES, RouterLink],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {
    
    loginLogoutText: string = 'Login';
    isCollapsed: boolean = false;
	
    constructor(private authService: AuthService, 
                private router: Router, 
                private location: Location) {}
    
    ngOnInit() {
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
                this.router.navigateByUrl('/customers');
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
        this.router.navigateByUrl('/login');
    }
    
    highlight(path: string) {
        return this.location.path() === path;
    }
}
