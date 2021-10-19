import { Component, OnInit } from '@angular/core';
import { LaunchesService } from '../../services/launches.service';
import { ActivatedRoute } from '@angular/router';
import { LaunchDetail } from '../../models/launch-detail.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-launches-details',
  templateUrl: './launches-details.component.html',
  styleUrls: ['./launches-details.component.css']
})
export class LaunchesDetailsComponent implements OnInit {

  public launchDetails?: LaunchDetail;
  public infoColumns: string[] = ['infoName', 'infoData'];
  public generalInfo: Object[] = [];
  public rocketInfo: Object[] = [];
  public isLoading: boolean = false;
  public gridColumns: number = 0;
  public videoUrl?: SafeUrl;

  constructor(
    private launchesService: LaunchesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    AOS.init({
      duration: 1200,
    })
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isLoading = true;
        this.launchesService.getLaunch(id).subscribe((launch) => {
          this.launchDetails = launch;
          this.generalInfo = [
            {
              infoName: 'Mission Image:',
              infoData: this.launchDetails?.links.missionImage
            },
            {
              infoName: 'Mission Name:',
              infoData: this.launchDetails?.missionName
            },
            {
              infoName: 'Launch Date:',
              infoData: this.launchDetails?.launchDate
            },
            {
              infoName: 'Launch Site:',
              infoData: this.launchDetails?.launchSite
            },
            {
              infoName: 'Launch Success:',
              infoData: this.launchDetails?.launchSuccess
            },
            {
              infoName: 'Details:',
              infoData: this.launchDetails?.details
            },
            {
              infoName: 'Crew:',
              infoData: this.launchDetails?.crew
            }
          ];
          this.rocketInfo = [
            {
              infoName: 'Rocket Launch Image:',
              infoData: this.launchDetails?.links.flickr
            },
            {
              infoName: 'Rocket Name:',
              infoData: this.launchDetails?.rocket.name
            },
            {
              infoName: 'Rocket Type:',
              infoData: this.launchDetails?.rocket.type
            },
            {
              infoName: 'Total Flights:',
              infoData: this.launchDetails?.rocket.totalFlights
            },
            {
              infoName: 'Landing Intent:',
              infoData: this.launchDetails?.rocket.landingIntent
            },
            {
              infoName: 'Landing Success:',
              infoData: this.launchDetails?.rocket.landingSuccess
            },
            {
              infoName: 'Reused:',
              infoData: this.launchDetails?.rocket.reused
            },
            {
              infoName: 'Payloads:',
              infoData: this.launchDetails?.rocket.payloads
            }
          ];
          this.launchDetails.links.video = this.launchDetails.links.video.replace('watch?v=', 'embed/');
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.launchDetails.links.video);
          this.isLoading = false;
        });
      }
    });
    this.onResize(window);
  }

  onResize(window: any) {
    if (window.innerWidth <= 767) {
      this.gridColumns = 1;
    }
    else if (window.innerWidth <= 960) {
      this.gridColumns = 2;
    }
    else if (window.innerWidth <= 1200) {
      this.gridColumns = 3;
    }
    else {
      this.gridColumns = 4;
    }
  }

  onImageClick(rocketImage: HTMLImageElement) {
    rocketImage.requestFullscreen();
  }
}
