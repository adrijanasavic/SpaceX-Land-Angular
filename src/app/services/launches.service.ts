import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Launch } from '../models/launch.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {

  private launches: Launch[] = [];
  private launchesUpdate = new Subject<{ launches: Launch[], allLoaded: boolean,  searchMode: boolean }>();
  private limit: number = 20;
  private offset: number = 0;
  private launchesCount: number = 20;
  private allDataLoaded: boolean = false;
  private searchMode: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  getLaunches() {
    if (this.launchesCount > this.launches.length) {
      this.http.get<any[]>(`https://api.spacexdata.com/v3/launches?limit=${this.limit}&offset=${this.offset}`)
        .pipe(
          map((responseData) => {
            return {
              launches: responseData.map((data) => {
                const launch: Launch = {
                  id: data.flight_number,
                  missionImagePath: data.links.mission_patch_small,
                  missionName: data.mission_name,
                  launchDate: new Date(data.launch_date_utc).toDateString(),
                  launchDetails: data.details ? data.details : 'There are no details about this launch.',
                  launchYear: data.launch_year
                }
                return launch;
              }),
            };
          })
          )
          .subscribe((launchesData) => {
            this.offset += 20;
            this.launches.push(...launchesData.launches);
            this.allDataLoaded = launchesData.launches.length === 0;
          this.launchesUpdate.next({ launches: [...this.launches], allLoaded: this.allDataLoaded, searchMode: this.searchMode });
        });
    }
    else {
      this.launchesUpdate.next({ launches: [...this.launches], allLoaded: this.allDataLoaded, searchMode: this.searchMode });
    }
  }
  getLaunchesObservable() {
    return this.launchesUpdate.asObservable();
  }
  loadMoreLaunches() {
    this.launchesCount += 20;
    this.getLaunches();
  }

  searchForMission(missionName: string) {
    if(missionName) {
      this.searchMode = true;
      const filteredLaunches = this.launches.filter(l => {
        for(let i = 0; i < missionName.length; i++) {
          if(l.missionName[i].toLowerCase() !== missionName[i].toLowerCase()) {
            return false;
          }
        }
        return true;
      });
      this.launchesUpdate.next({ launches: filteredLaunches, allLoaded: this.allDataLoaded, searchMode: this.searchMode });
    }
    else {
      this.launchesUpdate.next({ launches: [...this.launches], allLoaded: this.allDataLoaded, searchMode: this.searchMode });
    }
  }
}
