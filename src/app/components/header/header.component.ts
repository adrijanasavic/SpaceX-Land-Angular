import { Component, OnInit } from '@angular/core';
import { LaunchesService } from 'src/app/services/launches.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private searchInput?: HTMLInputElement;
  private showInputSub?: Subscription;
  public showSearch: boolean = true;

  constructor(
    private launchesService: LaunchesService
  ) { }

  ngOnInit(): void {
    this.showInputSub = this.launchesService.getShowInputObservable().subscribe((data: {show: boolean}) => {
      this.showSearch = data.show;
    })
    document.querySelector('mat-toolbar')!.addEventListener('click', (event) =>{
      if(this.searchInput && event.target !== this.searchInput){
        this.searchInput.value = '';
        this.onMissionSearch(this.searchInput);
      }
    });
  }

  onChangeTheme() {
    document.body.classList.toggle('light-theme-mode');
  }

  onMissionSearch(element: HTMLInputElement){
    this.searchInput = element;
    this.launchesService.searchForMission(element.value);
  }
}
