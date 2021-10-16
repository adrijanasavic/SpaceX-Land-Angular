import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaceX-Land';
  showHeader: boolean = true;

  ngOnInit() {
  }

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event['url'] === '**') {
          this.showHeader = false;
        }else {
          this.showHeader = true;
        }
      }
    });
  }
}
