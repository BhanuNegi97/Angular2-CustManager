import { Component, OnInit } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { ICustomer, IState } from '../shared/interfaces';

@Component({
  selector: 'customer-edit',
  templateUrl: './app/customers/customerEdit.component.html',
  directives: [RouterLink],
  providers: [ DataService ]
})

export class CustomerEditComponent implements OnInit {
  
  customer: ICustomer;
  states: IState[];
  updateStatus: boolean;
  errorMessage: string;
  buttonText: string = 'Update';

  constructor(private dataService: DataService, private routeParams: RouteParams) { }

  ngOnInit() { 
      const id = parseInt(this.routeParams.get('id'), 10);
            
      this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
              this.customer = customer;
          });  
          
      		this.dataService.getStates()
            .subscribe((states: IState[]) => {
              this.states = states;
          });
  }
  
  onSubmit() {
    
  }

}


