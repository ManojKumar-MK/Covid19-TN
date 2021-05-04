import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { RouterModule } from '@angular/router'; // Router to setup router outlet
// Lottie
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AppRoutingModule } from './app-routing.module';
import { CountriesComponent } from './components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { GoogleChartsModule } from 'angular-google-charts';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
