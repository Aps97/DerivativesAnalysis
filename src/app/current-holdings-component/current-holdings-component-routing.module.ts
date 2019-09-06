import { CurrentHoldingsComponentComponent } from './current-holdings-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './../header/header.component';

const routes: Routes = [
  {
    path: 'app/holdings',
    component: HeaderComponent,
    children: [
      { path: '', component: CurrentHoldingsComponentComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentHoldingsComponentRoutingModule { }
