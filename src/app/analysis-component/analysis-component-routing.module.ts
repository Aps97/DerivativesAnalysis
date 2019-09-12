import { AuthGuard } from './../auth.guard';
import { AnalysisComponentComponent } from './analysis-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './../header/header.component';

const routes: Routes = [
  {
    path: 'app/analysis',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AnalysisComponentComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisComponentRoutingModule { }
