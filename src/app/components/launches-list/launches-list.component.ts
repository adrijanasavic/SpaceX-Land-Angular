import { Component, OnDestroy, OnInit } from '@angular/core';
import { LaunchesService } from '../../services/launches.service';
import { Subscription } from 'rxjs';
import { Launch } from '../../models/launch.model';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.css']
})
export class LaunchesListComponent implements OnInit, OnDestroy {
  public launchesList: Launch[] = [];
  private launchesSub?: Subscription;
  public columns: number = 0;
  public allLoaded: boolean = false;
  public searchMode: boolean = true;
  public isLoading: boolean = true;

  constructor(
    private launchesService: LaunchesService
  ) { }

  ngOnInit(): void {
    this.launchesSub = this.launchesService.getLaunchesObservable().subscribe((data: { launches: Launch[], allLoaded: boolean, searchMode: boolean }) => {
      if (data.allLoaded) {
        this.allLoaded = true;
      }
      this.launchesList = data.launches;
      this.searchMode = data.searchMode;
      this.isLoading = false;
    });
    this.launchesService.getLaunches();
    this.setGridColumns(window.innerWidth);
  }

  private setGridColumns(windowWidth: number) {
    if(window.innerWidth <= 767) {
      this.columns = 1;
    }
    else if(window.innerWidth <= 960) {
      this.columns = 2;
    }
    else if(window.innerWidth <= 1200) {
      this.columns = 3;
    }
    else {
      this.columns = 4;
    }
  }

  onResize(event: any) {
    console.log(event.target.innerWidth)
    if(event.target.innerWidth <= 768) {
      this.columns = 1;
    }
    else if(event.target.innerWidth <= 960) {
      this.columns = 2;
    }
    else if(event.target.innerWidth <= 1200) {
      this.columns = 3;
    }
    else {
      this.columns = 4;
    }
  }

  onLoadClicked() {
    this.isLoading = true;
    this.launchesService.loadMoreLaunches();
  }

  ngOnDestroy(): void {
    this.launchesSub?.unsubscribe();
  }
}
