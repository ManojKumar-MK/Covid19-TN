import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalDataSummary } from '../models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl = `https://api.covid19india.org/csv/latest/district_wise.csv`;
  // private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private http: HttpClient) {}

  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        // console.log(result);

        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          let cols = row.split(',');
          if (cols[1] == 'TN' && cols[0] != '0' && cols[4] != 'Unknown') {
            let cs = {
              district: cols[4],
              confirmed: +cols[5],
              deaths: +cols[8],
              recovered: +cols[7],
              active: +cols[6]
            };

            let temp: GlobalDataSummary = raw[cs.district];
            if (temp) {
              temp.active = cs.active + temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths + temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;

              raw[cs.district] = temp;
            } else {
              raw[cs.district] = cs;
            }
          }
        });
        console.log(raw);

        return <GlobalDataSummary[]>Object.values(raw);
      })
    );
  }
}
