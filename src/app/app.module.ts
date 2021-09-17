import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { BurnsService } from './services/burns.service';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BurnsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
