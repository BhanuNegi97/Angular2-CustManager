import { Component, OnInit } from 'angular2/core';
import { RouteParams, RouterLink } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { OrdersTableComponent } from '../orders/ordersTable.component';
import { ICustomer } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { IUserSecurity } from '../shared/interfaces';

@Component({ 
  selector: 'customer-orders', 
  templateUrl: 'app/customers/customer.component.html',
  directives: [RouterLink, OrdersTableComponent]
})
export class CustomerComponent implements OnInit {

  customer: ICustomer;
  user: IUserSecurity;

  constructor(private dataService: DataService, 
              private authService: AuthService, 
              private routeParams: RouteParams) { }
  
  ngOnInit() {
      this.user = this.authService.user;
    
      const id = parseInt(this.routeParams.get('id'), 10);
      this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
              this.customer = customer;
          });        
  }

}
