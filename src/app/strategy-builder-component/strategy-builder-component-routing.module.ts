import { AuthGuard } from './../auth.guard';
import { StrategyBuilderComponentComponent } from './strategy-builder-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './../header/header.component';

const routes: Routes = [
  {
    path: 'app/strategies',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StrategyBuilderComponentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyBuilderComponentRoutingModule { }


