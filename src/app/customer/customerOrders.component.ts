import { Component, OnInit, Injector } from 'angular2/core';
import { Router, RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { OrdersTableComponent } from '../orders/ordersTable.component'; 
import { IUserSecurity, ICustomer } from '../shared/interfaces';

@Component({
  selector: 'customer-orders',
  templateUrl: 'app/customer/customerOrders.component.html',
  directives: [RouterLink, OrdersTableComponent]
})
export class CustomerOrdersComponent implements OnInit {
  
  user: IUserSecurity;
  customer: ICustomer;

  constructor(private _dataService: DataService, 
              private _authService: AuthService,
              private _router: Router, 
              private _injector: Injector) { }

  ngOnInit() { 
    this.user = this._authService.user;
  
    //Get route parameter (id) from parent route
    const params = this._injector.parent.parent.get(RouteParams);
    const id = parseInt(params.get('id'), 10);
    
    this._dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
            this.customer = customer;
        });  
  }

}