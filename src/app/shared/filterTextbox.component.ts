import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

@Component({
  selector: 'filter-textbox',
  template: `
    <form>
         {{ label }}
         <input type="text" 
                [(ngModel)]="model.filter" 
                (keyup)="filterChanged($event)"  />
    </form>
  `,
  directives: [FORM_DIRECTIVES]
})
export class FilterTextboxComponent {

  
    model: { filter: string } = { filter: null };
    
    @Input() label: string = 'Filter';
    
    @Output()
    changed: EventEmitter<string> = new EventEmitter();

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    }
}
