import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RadioButtonModule } from 'primeng/primeng';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { CurrentHoldingsComponentComponent } from './current-holdings-component/current-holdings-component.component';
import { StrategyBuilderComponentComponent } from './strategy-builder-component/strategy-builder-component.component';
import { AnalysisComponentComponent } from './analysis-component/analysis-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    CurrentHoldingsComponentComponent,
    StrategyBuilderComponentComponent,
    AnalysisComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
