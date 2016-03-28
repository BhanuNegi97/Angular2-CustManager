import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerEditComponent } from './customer/customerEdit.component'
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OverlayComponent } from './shared/components/overlay.component';

@Component({ 
  selector: 'app-component',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, OverlayComponent],
})
//This will become @Routes soon
@RouteConfig([
  { path: '/customers', as: 'Customers', component: CustomersComponent, useAsDefault: true },
  { path: '/customers/:id/...', as: 'Customer', component: CustomerComponent },
  { path: '/customers/:id/edit', as: 'CustomerEdit', component: CustomerEditComponent },
  { path: '/orders', as: 'Orders', component: OrdersComponent },
  { path: '/about', as: 'About', component: AboutComponent },
  { path: '/login', as: 'Login', component: LoginComponent },
  { path: '/**', redirectTo: ['Customers']}
])
export class AppComponent {
  
  constructor() {

  }
  
}
