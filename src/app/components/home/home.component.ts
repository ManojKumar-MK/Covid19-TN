import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globalData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  datatable = [];
  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    height: 500,
    options: {
      animation: {
        duration: 1500,
        easing: 'out'
      }
      //is3D: true
    }
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: result => {
        console.log(result);
        this.globalData = result;
        result.forEach(cs => {
          this.totalActive += cs.active;
          this.totalConfirmed += cs.confirmed;
          this.totalDeaths += cs.deaths;
          this.totalRecovered += cs.recovered;
        });

        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }

  initChart(caseType: string) {
    this.datatable = [];
    //this.datatable.push(['District', 'Cases']);

    this.globalData.forEach(cs => {
      let value: number;
      if (caseType == 'c') if (cs.confirmed > 500) value = cs.confirmed;

      if (caseType == 'a') if (cs.active > 500) value = cs.active;
      if (caseType == 'd') if (cs.deaths > 500) value = cs.deaths;

      if (caseType == 'r') if (cs.recovered > 500) value = cs.recovered;

      this.datatable.push([cs.district, value]);
    });
    console.log(this.datatable);
  }
}
