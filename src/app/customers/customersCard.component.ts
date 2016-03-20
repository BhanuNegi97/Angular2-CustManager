import { Component, Input, OnInit, provide } from 'angular2/core';
import { CORE_DIRECTIVES, NgLocalization } from 'angular2/common';
import { RouterLink } from 'angular2/router';

import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { AuthService } from '../shared/services/auth.service';
import { IUserSecurity } from '../shared/interfaces';

@Component({ 
  selector: 'customers-card', 
  templateUrl: 'app/customers/customersCard.component.html',
  directives: [CORE_DIRECTIVES, RouterLink],
  pipes: [CapitalizePipe, TrimPipe]
})
export class CustomersCardComponent implements OnInit {

  @Input() customers: any[] = [];
  user: IUserSecurity;
  
  constructor(private authService: AuthService) { }
  
  ngOnInit() {
      this.user = this.authService.user;
  }

}

