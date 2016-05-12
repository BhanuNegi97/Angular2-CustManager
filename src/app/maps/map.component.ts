import { Component, OnInit, Input, ContentChildren, ElementRef, QueryList, ChangeDetectionStrategy } from '@angular/core';

import { MapPointComponent } from './mapPoint.component';

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  directives: [MapPointComponent],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements OnInit {
  
  private isEnabled : boolean;
  private loadingScript: boolean;
  private map: google.maps.Map;
  
  mapHeight: string;
  mapWidth: string;

  @Input() height: number;
  @Input() width: number;
  @Input() latitude: number = 34.5133;
  @Input() longitude: number = -94.1629;
  @Input() markerText: string = 'Your Location';
  @Input() zoom: number = 8;  
  
  //Necessary since a map rendered while container is hidden 
  //will not load the map tiles properly and show a grey screen
  @Input() public get enabled() : boolean {
    return this.isEnabled;
  }
  
  public set enabled(isEnabled : boolean) {
    this.isEnabled = isEnabled;
    this.init();
  }  
  
  @ContentChildren(MapPointComponent) mapPoints : QueryList<MapPointComponent>;
  
  constructor(private elem: ElementRef) { }

  ngOnInit() {  
       if (this.latitude && this.longitude) {
        if (this.mapHeight && this.mapWidth) {
          this.mapHeight = this.height + 'px';
          this.mapWidth = this.width + 'px';  
        }
        else {
          const hw = this.getWindowHeightWidth(this.elem.nativeElement.ownerDocument);
          this.mapHeight = hw.height / 2 + 'px';
          this.mapWidth = hw.width + 'px';
        }
      }
  }
  
  init() {      
      //Need slight delay to avoid grey box when google script has previously been loaded.
      //Otherwise map <div> container may not be visible yet which causes the grey box. 
      setTimeout(() => {
        this.ensureScript();
      }, 200);
  }
  
  private getWindowHeightWidth(document: HTMLDocument) {
    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    let height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    
    if (width > 900) width = 900;
    
    return { height: height, width: width };
  }
  
  private ensureScript() {
    //if (this.loadingScript) return;
    this.loadingScript = true;
    const document = this.elem.nativeElement.ownerDocument;
    const script = <HTMLScriptElement>document.querySelector('script[id="googlemaps"]');
    if (script) {
      if (this.isEnabled) this.renderMap();
    } else {
      const script = document.createElement('script');
      script.id = 'googlemaps';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js';
      script.onload = () => {
        this.loadingScript = false;
        if (this.isEnabled) this.renderMap();
      };      
      document.body.appendChild(script);
     }
  }
  
  private renderMap() {
      const latlng = (this.latitude && this.longitude) ? new google.maps.LatLng(this.latitude, this.longitude) : null;
      const options = {
        zoom: this.zoom,
        center: latlng,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      const mapContainer : HTMLDivElement = this.elem.nativeElement.firstChild;          
      const map : google.maps.Map = new google.maps.Map(mapContainer, options);
      
      if (this.mapPoints && this.mapPoints.length) {
        this.mapPoints.forEach((point: MapPointComponent) => {
            const mapPointLatlng = new google.maps.LatLng(point.latitude, point.longitude);
            this.createMarker(mapPointLatlng, map, point.markerText);
        });
      }
      else {
        this.createMarker(latlng, map, this.markerText);
      }     
  }
  
  private createMarker(position: google.maps.LatLng, map: google.maps.Map, title: string) {
    
      var infowindow = new google.maps.InfoWindow({
        content: title
      });
      
      const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP
      });
      
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
  }
}