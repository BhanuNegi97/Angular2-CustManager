import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Response } from 'angular2/http';
import { RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { ICustomer } from '../shared/interfaces';

@Component({
  selector: 'customer-edit',
  templateUrl: './app/customers/customerEdit.component.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers: [ DataService ]
})

export class CustomerEditComponent implements OnInit {
  
  customer: ICustomer;

  constructor(private dataService: DataService, private routeParams: RouteParams) { }

  ngOnInit() { 
      const id = parseInt(this.routeParams.get('id'), 10);
      this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
              this.customer = customer;
          });  
  }

}


