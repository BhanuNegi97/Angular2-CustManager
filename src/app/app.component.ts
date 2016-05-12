import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './+customer/customer.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OverlayComponent } from './overlay/overlay.component';
import { APP_PROVIDERS } from './app.providers';

@Component({ 
  moduleId: module.id,
  selector: 'app-component',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, OverlayComponent],
  providers:  [APP_PROVIDERS]
})
//This will become @Routes soon
@Routes([
  { path: '/', component: CustomersComponent },
  { path: '/customers/:id', component: CustomerComponent },
  { path: '/orders', component: OrdersComponent },
  { path: '/about', component: AboutComponent },
  { path: '/login', component: LoginComponent },
  { path: '*', component: CustomersComponent }
])
export class AppComponent {
  
  constructor(private router: Router) {

  }
  
}

//original async loader code

//loader: () => window['System'].import('app/+customer')
// .then((module: any) => module.CustomerComponent)
