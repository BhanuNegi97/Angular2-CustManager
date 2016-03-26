import { Component, OnInit } from 'angular2/core';

import { FilterTextboxComponent } from '../shared/components/filterTextbox.component';
import { IPagedResults } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { DataFilterService } from '../shared/services/dataFilter.service';
import { CustomersCardComponent } from './customersCard.component';
import { CustomersGridComponent } from './customersGrid.component';
import { PaginationComponent } from '../shared/components/pagination.component';


@Component({ 
  selector: 'customers', 
  providers: [DataFilterService],
  templateUrl: 'app/customers/customers.component.html',
  directives: [FilterTextboxComponent, CustomersCardComponent, 
               CustomersGridComponent, PaginationComponent]
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  gridDisplayModeEnabled: boolean;
  customers: any[] = [];
  filteredCustomers: any[] = [];
  
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private dataService: DataService, 
              private dataFilterService: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.gridDisplayModeEnabled = false;
    this.getCustomersSummary(1);
  }
  
  getCustomersSummary(page: number) {
        this.dataService.getCustomersSummary(page - 1, this.pageSize)
            .subscribe((response: IPagedResults) => {
              this.customers = this.filteredCustomers = response.results;
              this.totalRecords = response.totalRecords;
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
  
  pageChanged(page: number) {
    this.getCustomersSummary(page);
  }

}
