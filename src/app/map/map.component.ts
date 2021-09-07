import {Component, OnInit, ViewChild, ElementRef, Input, SimpleChange} from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import {Point} from "../core/models/point.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input()
  points: Point[];
  private map?: H.Map;
  private group?: H.map.Group;
  private icon?: H.map.Icon;

  @ViewChild('map') mapDiv?: ElementRef;

  private svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c43227">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: 'aJNPNmLKH4I7TvsP9PBxKPPCm3gw7lsu25rGezT4Fb8'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          zoom: 10,
          center: { lat: 39.90633, lng: 116.50847 }
        },
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      const localProvider = new H.map.provider.LocalObjectProvider();
      map.addLayer(new H.map.layer.ObjectLayer(localProvider));

      const group = new H.map.Group();
      localProvider.getRootGroup().addObjects([group]);

      this.icon = new H.map.Icon(this.svgMarkup);
      this.map = map;
      this.group = group;
    }
  }

  ngOnChanges(changes: any): void{
    if(this.map){
      this.group.removeAll();
      if(changes.points.currentValue){
        changes.points.currentValue.forEach((point:Point) => this.group.addObject(new H.map.Marker({lat: point.latitude, lng: point.longitude }, {data: null, icon: this.icon})));
        this.map.getViewModel().setLookAtData({
          bounds: this.group.getBoundingBox()
        });
      }
    }
  }
}
