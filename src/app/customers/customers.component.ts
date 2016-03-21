import { Component, OnInit } from 'angular2/core';

import { FilterTextboxComponent } from '../shared/components/filterTextbox.component';
import { IPagedResults } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { DataFilterService } from '../shared/services/dataFilter.service';
import { CustomersCardComponent } from './customersCard.component';
import { CustomersGridComponent } from './customersGrid.component';


@Component({ 
  selector: 'customers', 
  providers: [DataFilterService],
  templateUrl: 'app/customers/customers.component.html',
  directives: [FilterTextboxComponent, CustomersCardComponent, CustomersGridComponent]
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  gridDisplayModeEnabled: boolean;
  customers: any[] = [];
  filteredCustomers: any[] = [];

  constructor(private dataService: DataService, 
              private dataFilterService: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.gridDisplayModeEnabled = false;

    this.dataService.getCustomersSummary(1, 10)
        .subscribe((response: IPagedResults) => {
          this.customers = this.filteredCustomers = response.results;
        });
  }

  changeDisplayMode(mode: string) {
      this.gridDisplayModeEnabled = (mode === 'Grid');
  }

  filterChanged(filterData: string) {
      this.filteredCustomers = this.dataFilterService.filter(this.customers, 
                                 ['firstName', 'lastName', 'city', 'state.name'], 
                                 filterData);
  }

}
