import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerEditComponent } from './customer/customerEdit.component'
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { OverlayComponent } from './overlay/overlay.component';
import { APP_PROVIDERS } from './app.providers';

@Component({ 
  selector: 'app-component',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, OverlayComponent],
  providers:  [APP_PROVIDERS]
})
//This will become @Routes soon
@RouteConfig([
  { path: '/customers', name: 'Customers', component: CustomersComponent, useAsDefault: true },
  { path: '/customers/:id/...', name: 'Customer', component: CustomerComponent },
  { path: '/customers/:id/edit',name: 'CustomerEdit', component: CustomerEditComponent },
  { path: '/orders', name: 'Orders', component: OrdersComponent },
  { path: '/about', name: 'About', component: AboutComponent },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/**', redirectTo: ['Customers']}
])
export class AppComponent {
  
  constructor() {

  }
  
}
