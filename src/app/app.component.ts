import {Component, ElementRef, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  title = 'StateMap';
  mapCenter = [144.946457, -37.840935];
  basemapType = 'satellite';
  mapZoomLevel = 12;
}
