import { Component, OnInit } from 'angular2/core';
import { Router, RouteConfig, RouterOutlet, RouterLink } from 'angular2/router';

import { CustomerDetailsComponent } from './customerDetails.component';
import { CustomerOrdersComponent } from './customerOrders.component';

@Component({ 
  selector: 'customer', 
  templateUrl: 'app/customer/customer.component.html',
  directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
  {path:'/orders',  name: 'CustomerOrders',  component: CustomerOrdersComponent, useAsDefault: true },
  {path:'/details', name: 'CustomerDetails', component: CustomerDetailsComponent }
])
export class CustomerComponent implements OnInit {

  customerDetailsEnabled: boolean;

  constructor(private _router: Router) { }
  
  ngOnInit() {
    if (this._router.currentInstruction.component.urlPath === 'details') {
      this.customerDetailsEnabled = true;
    }
  }

}