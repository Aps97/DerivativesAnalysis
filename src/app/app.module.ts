import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RadioButtonModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { CurrentHoldingsComponent } from './current-holdings/current-holdings.component';
import { StrategyBuilderComponentComponent } from './strategy-builder-component/strategy-builder-component.component';
import { AnalysisComponentComponent } from './analysis-component/analysis-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    CurrentHoldingsComponent,
    StrategyBuilderComponentComponent,
    AnalysisComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: AppComponent },
      { path: 'login/holdings', component: CurrentHoldingsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
