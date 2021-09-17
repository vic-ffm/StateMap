import { Component, OnInit,  ViewChild,  ElementRef,  Input,  Output,  EventEmitter,  OnDestroy } from '@angular/core';
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types
import { BurnsService } from '../services/burns.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit, OnDestroy {

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  @Input() zoom: number;
  @Input() center: Array<number>;
  @Input() basemap: string;


  private view: esri.MapView = null;
  constructor(private burnsService: BurnsService) { }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, Graphic, GraphicsLayer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this.basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this.center,
        zoom: this.zoom,
        map: map
      };

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      var burns = this.burnsService.getBurns();

      burns.forEach(burn => {
        const point = { //Create a point
          type: 'point',
          longitude: burn.longitude,
          latitude: burn.latitude
       };

       const popupTemplate = {
        title: '{Name}',
        content: '{Status}'

     }
     let attributes = {
        Name: burn.burnName,
        Status: 'Going'
     }
  
       let simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
      };

      if(burn.status === 'SAFE') {
        simpleMarkerSymbol.color = [0, 153, 51];  // green
        attributes.Status = 'Safe';
      } else if(burn.status === 'UNDER CONTROL - 2') {
        simpleMarkerSymbol.color =  [153, 0, 0];
        attributes.Status = 'Under Control - 2';
      }       
  
       const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate
        });
  
        graphicsLayer.add(pointGraphic);
      });      

      this.view = new EsriMapView(mapViewProperties);
      await this.view.when();
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      console.log("mapView ready: ", this.view.ready);     
    });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

}
