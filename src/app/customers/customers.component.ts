import { Component, OnInit } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { IPagedResults, ICustomerSummary } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { DataFilterService } from '../shared/services/dataFilter.service';
import { CustomersCardComponent } from './customersCard.component';
import { CustomersGridComponent } from './customersGrid.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { MapComponent } from '../maps/map.component';
import { MapPointComponent } from '../maps/mapPoint.component';

@Component({ 
  selector: 'customers', 
  providers: [DataFilterService],
  templateUrl: 'app/customers/customers.component.html',
  directives: [RouterLink, FilterTextboxComponent, CustomersCardComponent, 
               CustomersGridComponent, PaginationComponent, MapComponent, MapPointComponent],
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  customers: ICustomerSummary[] = [];
  filteredCustomers: ICustomerSummary[] = [];
  
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private dataService: DataService, 
              private dataFilterService: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
    this.displayMode = DisplayModeEnum.Card;
    this.getCustomersSummary(1);
  }
  
  getCustomersSummary(page: number) {
        this.dataService.getCustomersSummary(page - 1, this.pageSize)
            .subscribe((response: IPagedResults<ICustomerSummary[]>) => {
              this.customers = this.filteredCustomers = response.results;
              this.totalRecords = response.totalRecords;
            });
  }
  
  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
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

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
