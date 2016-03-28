import { Component, OnInit, Input, ElementRef } from 'angular2/core';

@Component({
  selector: 'map',
  templateUrl: 'app/maps/map.component.html'
})

export class MapComponent implements OnInit {

  @Input() height: number;
  @Input() width: number;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number = 8;
    
  mapHeight: string;
  mapWidth: string;
  
  private _document: HTMLDocument;
  
  constructor(private _elem: ElementRef) { }

  ngOnInit() {  
    this._document = this._elem.nativeElement.ownerDocument;
     
    if (this.latitude && this.longitude) {
      if (this.mapHeight && this.mapWidth) {
        this.mapHeight = this.height + 'px';
        this.mapWidth = this.width + 'px';  
      }
      else {
        const hw = this.getWindowHeightWidth();
        this.mapHeight = hw.height / 2 + 'px';
        this.mapWidth = hw.width + 'px';
      }
      
      //Need slight delay to avoid grey box when google script has previously been loaded.
      //Otherwise map <div> container may not be visible yet which causes the grey box. 
      setTimeout(() => {
        this.loadScript();
      }, 100);
    }
  }
  
  getWindowHeightWidth() {
    let width = window.innerWidth
    || this._document.documentElement.clientWidth
    || this._document.body.clientWidth;

    let height = window.innerHeight
    || this._document.documentElement.clientHeight
    || this._document.body.clientHeight;
    
    if (width > 900) width = 900;
    
    return { height: height, width: width };
  }
  
  loadScript() {
    var scriptLoaded = this._document.querySelector('script[id="googlemaps"]');
    if (!scriptLoaded) {
      const script = this._document.createElement('script');
      script.id = 'googlemaps';
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js';
      script.onload = () => {
        this.mapLocation();
      };      
      this._document.body.appendChild(script);
     }
     else {
       this.mapLocation();
     }
  }
  
  mapLocation() {
      const latlng = new google.maps.LatLng(this.latitude, this.longitude);
      const options = {
        zoom: this.zoom,
        center: latlng,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      const mapContainer : HTMLDivElement = this._elem.nativeElement.firstChild;          
      const map : google.maps.Map = new google.maps.Map(mapContainer, options);      
      const marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Your location"
      });
      
      //Can be used to monitor when tiles are loaded if needed
      //map.addListener('tilesloaded', () => {
        
      //});
  }

}