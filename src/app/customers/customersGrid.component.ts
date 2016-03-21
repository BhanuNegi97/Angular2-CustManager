import { Component, Input, OnInit } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { Sorter } from '../shared/utils/sorter';
import { AuthService } from '../shared/services/auth.service';
import { IUserSecurity } from '../shared/interfaces';

@Component({ 
  selector: 'customers-grid', 
  providers: [Sorter],
  templateUrl: 'app/customers/customersGrid.component.html',
  directives: [RouterLink, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe]
})
export class CustomersGridComponent implements OnInit {

  @Input() customers: any[] = [];
  user: IUserSecurity;

  constructor(private authService: AuthService, private sorter: Sorter) { }
   
  ngOnInit() {
      this.user = this.authService.user;
  }

  sort(prop: string) {
      this.sorter.sort(this.customers, prop);
  }

}
