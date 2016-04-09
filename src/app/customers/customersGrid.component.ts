import { Component, Input, OnInit, ChangeDetectionStrategy } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { Sorter } from '../shared/utils/sorter';
import { AuthService } from '../shared/services/auth.service';
import { IUserSecurity } from '../shared/interfaces';
import { TrackerService } from '../shared/services/tracker.service';

@Component({ 
  selector: 'customers-grid', 
  providers: [Sorter],
  templateUrl: 'app/customers/customersGrid.component.html',
  directives: [RouterLink, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomersGridComponent implements OnInit {

  @Input() customers: any[] = [];
  user: IUserSecurity;

  constructor(private authService: AuthService, private sorter: Sorter, private tracker: TrackerService) { }
   
  ngOnInit() {
      this.user = this.authService.user;
  }

  sort(prop: string) {
      this.sorter.sort(this.customers, prop);
  }

}
