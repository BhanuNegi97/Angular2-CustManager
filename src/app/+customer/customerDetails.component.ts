import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Router, RouterLink, RouteParams, ComponentInstruction } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { MapComponent } from '../maps/map.component';
import { LogService } from '../shared/services/log.service'
import { IUserSecurity, ICustomer } from '../shared/interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: __moduleName,
  selector: 'customer-details',
  templateUrl: 'customerDetails.component.html',
  directives: [RouterLink, MapComponent]
})
export class CustomerDetailsComponent implements OnInit {
   
  user: IUserSecurity;
  customer: ICustomer;
  mapEnabled: boolean;

  constructor(private dataService: DataService, 
              private authService: AuthService,
              private router: Router,
              //private injector: ReflectiveInjector,
              private logger: LogService) { }
              
  ngOnInit() { 
    this.user = this.authService.user;
    
    //Get route parameter (id) from parent router (root)
    let instruction = this.router.root.currentInstruction;
    const id = +instruction.component.params['id'];
      
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
            this.customer = customer;
            this.mapEnabled = true;
        }, (err) => {
          this.logger.log(err);
        });  
  }
}