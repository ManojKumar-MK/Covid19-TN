import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HomeComponent } from './components/home/home.component';



const routes : Routes =[

  {path : ''         ,  component: HomeComponent},
  {path : 'countries',  component: CountriesComponent}
    
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports :[RouterModule]
})
export class AppRoutingModule { }
