import { Component, OnInit, Injector } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { MapComponent } from '../maps/map.component';
import { IUserSecurity, ICustomer } from '../shared/interfaces';

@Component({
  selector: 'customer-details',
  templateUrl: 'app/customer/customerDetails.component.html',
  directives: [RouterLink, MapComponent]
})
export class CustomerDetailsComponent implements OnInit {
  
  user: IUserSecurity;
  customer: ICustomer;

  constructor(private _dataService: DataService, 
              private _authService: AuthService, 
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