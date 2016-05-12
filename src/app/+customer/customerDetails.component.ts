import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, 
         RouteSegment, OnActivate, RouteTree } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { MapComponent } from '../maps/map.component';
import { LogService } from '../shared/services/log.service'
import { IUserSecurity, ICustomer } from '../shared/interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'customer-details',
  templateUrl: 'customerDetails.component.html',
  directives: [ROUTER_DIRECTIVES, MapComponent]
})
export class CustomerDetailsComponent implements OnActivate {
   
  user: IUserSecurity;
  customer: ICustomer;
  mapEnabled: boolean;

  constructor(private dataService: DataService, 
              private authService: AuthService,
              //private injector: ReflectiveInjector,
              private logger: LogService) { }
              
  routerOnActivate(current: RouteSegment, prev?: RouteSegment,
    currTree?: RouteTree, prevTree?: RouteTree) {
      
    this.user = this.authService.user;
    const id = +currTree.parent(current).getParam('id');
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
            this.customer = customer;
            this.mapEnabled = true;
        }, (err) => {
          this.logger.log(err);
        });   
  }
  
}