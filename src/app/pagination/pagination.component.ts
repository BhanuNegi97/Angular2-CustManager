import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
    <nav [hidden]="!isVisible">
      <ul class="pagination">
        <li [class.disabled]="!previousEnabled" (click)="previousNext(-1, $event)">
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li *ngFor="let page of pages" (click)="changePage(page, $event)" [class.active]="currentPage === page">
          <a href="#">{{ page }}</a>
        </li>
        <li [class.disabled]="!nextEnabled" (click)="previousNext(1, $event)">
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `
})

export class PaginationComponent implements OnInit {
  
  private _totalItems: number;
  private _pageSize: number;
  
  totalPages: number;
  pages: number[] = [];
  currentPage: number = 1;
  isVisible: boolean = false;
  previousEnabled: boolean = false;
  nextEnabled: boolean = true;
  
  @Input() get pageSize():number {
    return this._pageSize;
  }

  set pageSize(size:number) {
    this._pageSize = size;
    this.update();
  }
  
  @Input() get totalItems():number {
    return this._totalItems;
  }

  set totalItems(itemCount:number) {
    this._totalItems = itemCount;
    this.update();
  }
  
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { 

  }
  
  update() {
    if (this._totalItems && this._pageSize) {
      this.totalPages = Math.ceil(this._totalItems/this.pageSize);
      this.isVisible = true;
      if (this.totalItems >= this.pageSize) {
        for (let i = 1;i < this.totalPages + 1;i++) {
          this.pages.push(i);
        }
      }
      return;
    }
    
    this.isVisible = false;
  }
  
  previousNext(direction: number, event?: MouseEvent) {
    let page: number = this.currentPage;
    if (direction == -1) {
        if (page > 1) page--;
    } else {
        if (page < this.totalPages) page++;
    }
    this.changePage(page);
  }
  
  changePage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.previousEnabled = this.currentPage > 1;
    this.nextEnabled = this.currentPage < this.totalPages;
    this.pageChanged.emit(page);
  }

}