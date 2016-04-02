import { Component, OnInit, Input } from 'angular2/core';

@Component({
  selector: 'map-point',
  template: ``
})

export class MapPointComponent implements OnInit {

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() markerText: string;

  constructor() { }

  ngOnInit() { 

  }

}