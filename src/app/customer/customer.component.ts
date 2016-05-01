import { Component, OnInit } from '@angular/core';
import { Router, RouteConfig, RouterOutlet, RouterLink } from '@angular/router';

import { CustomerDetailsComponent } from './customerDetails.component';
import { CustomerOrdersComponent } from './customerOrders.component';

@Component({ 
  moduleId: __moduleName,
  selector: 'customer', 
  templateUrl: 'customer.component.html',
  directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
  {path:'/orders',  name: 'CustomerOrders',  component: CustomerOrdersComponent, useAsDefault: true },
  {path:'/details', name: 'CustomerDetails', component: CustomerDetailsComponent }
])
export class CustomerComponent implements OnInit {

  customerDetailsEnabled: boolean;

  constructor(private router: Router) { }
  
  ngOnInit() {
    if (this.router.currentInstruction.component.urlPath === 'details') {
      this.customerDetailsEnabled = true;
    }
  }

}