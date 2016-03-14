import { Component, Input, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { Sorter } from '../shared/sorter';

@Component({ 
  selector: 'customers-grid', 
  providers: [Sorter],
  templateUrl: 'app/customers/customersGrid.component.html',
  directives: [CORE_DIRECTIVES, RouterLink, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe]
})
export class CustomersGridComponent implements OnInit {

  @Input() customers: any[] = [];

  constructor(private sorter: Sorter) { }
  
  ngOnInit() {

  }

  sort(prop: string) {
      this.sorter.sort(this.customers, prop);
  }

}
