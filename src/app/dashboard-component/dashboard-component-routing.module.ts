import { AuthGuard } from './../auth.guard';
import { DashboardComponentComponent } from './dashboard-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './../header/header.component';


const routes: Routes = [
  {
    path: 'app/dashboard',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentRoutingModule { }
