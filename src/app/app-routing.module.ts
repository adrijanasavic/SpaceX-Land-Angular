import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesListComponent } from './components/launches-list/launches-list.component';
import { LaunchesDetailsComponent } from './components/launches-details/launches-details.component';

const routes: Routes = [
  { path: '', component: LaunchesListComponent},
  { path: 'launch/details/:id', component: LaunchesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
