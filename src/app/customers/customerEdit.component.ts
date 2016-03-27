import { Component, OnInit, ViewChild } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Router, RouterLink, RouteParams, OnActivate, ComponentInstruction } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { ICustomer, IState } from '../shared/interfaces';
import { GrowlerComponent, GrowlMessageType } from '../shared/components/growler.component';

@Component({
  selector: 'customer-edit',
  templateUrl: './app/customers/customerEdit.component.html',
  directives: [RouterLink, GrowlerComponent],
  providers: [GrowlerComponent]
})

export class CustomerEditComponent implements OnInit {
  
  
  customer: ICustomer;
  states: IState[];
  title: string;  
  buttonText: string = 'Update';
  
  @ViewChild(GrowlerComponent) _growler: GrowlerComponent;

  constructor(private _dataService: DataService, 
              private _router: Router,
              private _routeParams: RouteParams) { }

  ngOnInit() { 
    const id = parseInt(this._routeParams.get('id'), 10);
    
    this.title = (id) ? 'Modify': 'Add';
          
    this._dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
            this.customer = customer;
        });  
        
    this._dataService.getStates()
        .subscribe((states: IState[]) => {
            this.states = states;
        });
        
  }
  
  saveCustomer() {    
    if (this.customer.id) {
      this._dataService.updateCustomer(this.customer)
        .subscribe((status: boolean) => {
          this.processResponse(status, OperationTypeEnum.Insert);
      });
    }
    else {
      this._dataService.insertCustomer(this.customer)
        .subscribe((status: boolean) => {
          this.processResponse(status, OperationTypeEnum.Update);
      });
    }
  }
  
  deleteCustomer() {
      this._dataService.deleteCustomer(this.customer.id)
        .subscribe((status: boolean) => {
          if (status) {
            this._router.navigate(['Customers']);
          }
          else {
            this.processResponse(status, OperationTypeEnum.Delete);
          }
      });
  }
  
  processResponse(status: boolean, operationType: OperationTypeEnum) {
    if (status) {
      this.buttonText = 'Update';
      this._growler.growl('Operation performed successfully.', GrowlMessageType.Success);
    }
    else {
      this._growler.growl('Unable to perform operation.', GrowlMessageType.Danger)
    }
  }
 
  newCustomer() {
    this.customer = {
      id: 0,
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      city: null,
      state: { abbreviation: null, name: null },
      zip: null,
      gender: ''
    };
  }
  
  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    
  }

}

enum OperationTypeEnum {
  Insert,
  Update,
  Delete
}


