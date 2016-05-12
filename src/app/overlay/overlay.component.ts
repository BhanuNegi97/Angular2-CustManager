import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { HttpInterceptor } from './httpInterceptor';

@Component({ 
  moduleId: module.id,
  selector: 'overlay',
  template: `
    <!-- Using Flexbox for centering loader/indicator box. Won't work in 
         older browsers of course but I just don't care :-) -->
    <div *ngIf="enabled"  class="overlay-container">
        <div class="overlay-content">
          <ng-content></ng-content>
        </div>
    </div>
  `,
  styles: [`
    .overlay-container { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height:100%; 
      width:100%; 
      top:0; 
      position: fixed;  
      background-color: rgba(0, 0, 0, 0.3);
    }
      
    .overlay-content {  
      border: 1px solid #000; 
      background-color:#fff; 
      font-weight: bold;
      height: 100px;
      width: 300px;
      z-index:1000;
      text-align:center;
      opacity: 1;
      position: relative;
    }
  `],
  //Detach from change detection so that outside changes don't cause
  //change detector to look here. But, if enabled input property is changed
  //manually mark the component for change detection
  changeDetection: ChangeDetectionStrategy.Detached 
})
export class OverlayComponent implements OnInit {
  
    private isEnabled: boolean;
    private queue: string[] = [];
    private http: HttpInterceptor;
    
    @Input() delay: number = 100;
    
    get enabled(): boolean {
      return this.isEnabled;
    }
    
    set enabled(val: boolean) {
      this.isEnabled = val;
      //Let change detector know to look for changes so that overlay & message is shown/hidden
      this.changeRef.markForCheck();
    }
  
    constructor(http: Http, private changeRef: ChangeDetectorRef) {
       //Cast to HttpInterceptor that's actually provided (see ../app.providers.ts provider code for Http)
       this.http = <HttpInterceptor>http;
    }
    
    ngOnInit() {
        //Get notified as an XHR request is started
        this.http.requestStarted.subscribe((url: string) => {
            this.queue.push(url);
            
            if (this.queue.length === 1) {
                setTimeout(() => {
                    if (this.queue.length) {
                      this.enabled = true;
                    }
                }, this.delay);
            }
        });
        
        //Get notified as an XHR response is received
        this.http.requestCompleted.subscribe((url: string) => {
            this.queue.pop();
            
            if (this.queue.length === 0) {
                setTimeout(() => {
                    //Ensure we're still at 0 since another XHR call could have been triggered
                    //This helps avoid flicker
                    if (this.queue.length === 0) {
                        this.enabled = false;
                    }
                }, this.delay)
            }
        });    
        
        this.http.requestErrored.subscribe(() => {
          this.queue = [];
          this.enabled = false;
        }) 
    }

}
