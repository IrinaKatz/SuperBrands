import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { ShopsComponent } from './components/shops/shops.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SpecialistsComponent,
    ShopsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
