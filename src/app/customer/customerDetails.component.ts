import { Component, OnInit, Injector } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { MapComponent } from '../maps/map.component';
import { LogService } from '../shared/services/log.service'
import { IUserSecurity, ICustomer } from '../shared/interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'customer-details',
  templateUrl: 'app/customer/customerDetails.component.html',
  directives: [RouterLink, MapComponent]
})
export class CustomerDetailsComponent implements OnInit {
   
  user: IUserSecurity;
  customer: ICustomer;
  mapEnabled: boolean;

  constructor(private _dataService: DataService, 
              private _authService: AuthService, 
              private _injector: Injector,
              private _logger: LogService) { }

  ngOnInit() { 
    this.user = this._authService.user;
    
    //Get route parameter (id) from parent route
    const params = this._injector.parent.parent.get(RouteParams);
    const id = +params.get('id');
      
    this._dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
            this.customer = customer;
            this.mapEnabled = true;
        }, (err) => {
          this._logger.log(err);
        });  
  }
}