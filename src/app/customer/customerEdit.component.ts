import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, RouterLink, RouteParams, OnActivate, ComponentInstruction } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { ICustomer, IState } from '../shared/interfaces';
import { GrowlerComponent, GrowlMessageType } from '../growler/growler.component';

@Component({
  selector: 'customer-edit',
  templateUrl: './app/customer/customerEdit.component.html',
  directives: [RouterLink, GrowlerComponent],
  providers: [GrowlerComponent]
})

export class CustomerEditComponent implements OnInit, OnActivate {
    
  customer: ICustomer;
  states: IState[];
  title: string;  
  buttonText: string = 'Update';
  
  @ViewChild(GrowlerComponent) _growler: GrowlerComponent;

  constructor(private _dataService: DataService,
              private _authService: AuthService, 
              private _router: Router,
              private _routeParams: RouteParams) { }

  ngOnInit() { 
    const id = +this._routeParams.get('id');
    
    this.title = (id) ? 'Modify': 'Add';
          
    if (id === 0) {
      this.buttonText = 'Add';
      this.addNewCustomer();
    } else {
      this.buttonText = 'Update';
      this._dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
              this.customer = customer;
          }); 
    } 
        
    this._dataService.getStates()
        .subscribe((states: IState[]) => {
            this.states = states;
        });        
  }
  
  saveCustomer() {    
    if (this.customer.id) {
      this._dataService.updateCustomer(this.customer)
        .subscribe((status: boolean) => {
          this.processResponse(status, OperationTypeEnum.Update);
      });
    }
    else {
      this._dataService.insertCustomer(this.customer)
        .subscribe((customerId: number) => {
          if (customerId) { //Insert worked
           this.customer.id = customerId;
          }
          this.processResponse(customerId > 0, OperationTypeEnum.Insert);
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
 
  addNewCustomer() {
    this.customer = {
      id: 0,
      firstName: null,
      lastName: null,
      email: null,
      address: null,
      city: null,
      state: { abbreviation: null, name: null },
      zip: null,
      gender: '',
      latitude: 0,
      longitude: 0
    };
  }
  
  //If user tries to go here directly without being authenticated we'll redirect them
  //Keep in mind the server would normally do a "real" auth check on the user when this component
  //tries to get data - this is only a simple client-side check 
  //(and it'd be easy to change the isAuthenticated property - ALWAYS validate the user on the server!!!!)
  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) : Promise<any> {
    //if (!this._authService.user.isAuthenticated) {
    //  this._router.navigate(['Customers']);
    //}
    
    //We could use the commented out code to do a check if you don't want the component to load at all in cases
    //where someone hacks the isAuthenticated property. Assuming data is secured properly by the server all they
    //would see is the component screen...but if you don't want that to happen then do a check with the server.
    return new Promise((resolve) => {
      this._authService.validateUser()
        .subscribe((status: boolean) => {
            console.log('CustomerEditComponent routerOnActive');
            if (!status) this._router.navigate(['Customers']);
            resolve(status);
          }, (error: Error) => console.log(error)
        );
    });
  }

}

enum OperationTypeEnum {
  Insert,
  Update,
  Delete
}


