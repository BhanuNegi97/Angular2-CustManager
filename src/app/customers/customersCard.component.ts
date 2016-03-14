import { Component, Input, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';

import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';

@Component({ 
  selector: 'customers-card', 
  templateUrl: 'app/customers/customersCard.component.html',
  directives: [CORE_DIRECTIVES, RouterLink],
  pipes: [CapitalizePipe, TrimPipe]
})
export class CustomersCardComponent implements OnInit {

  @Input() customers: any[] = [];
  
  constructor() { }
  
  ngOnInit() {

  }

}
