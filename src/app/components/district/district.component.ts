import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globalData';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  data: GlobalDataSummary[] = [];
  district: string[] = [];

  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totalRecovered = 0;

  loading = true;

  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        console.log(cs.district);
        this.district.push(cs.district);
      });

      this.loading = false;
      this.updateValues('Ariyalur');
    });
  }

  updateValues(district: string) {
    console.log(district);

    this.data.forEach(cs => {
      if (cs.district == district) {
        this.totalConfirmed = cs.confirmed;
        this.totalActive = cs.active;
        this.totalRecovered = cs.recovered;
        this.totalDeath = cs.deaths;
      }
    });
  }
}
