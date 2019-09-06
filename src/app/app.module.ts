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
import { CurrentHoldingsComponentComponent } from './current-holdings-component/current-holdings-component.component';
import { StrategyBuilderComponentComponent } from './strategy-builder-component/strategy-builder-component.component';
import { AnalysisComponentComponent } from './analysis-component/analysis-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { HeaderComponent } from './header/header.component';
import { DashboardComponentModule } from './dashboard-component/dashboard-component.module';
import { StrategyBuilderComponentModule } from './strategy-builder-component/strategy-builder-component.module';
import { CurrentHoldingsComponentModule } from './current-holdings-component/current-holdings-component.module';
import { AnalysisComponentModule } from './analysis-component/analysis-component.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    CurrentHoldingsComponentComponent,
    StrategyBuilderComponentComponent,
    AnalysisComponentComponent,
    HeaderComponent,
    LoginComponent
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
    RouterModule.forRoot([
      { path: 'login', component: AppComponent},
      { path: '', component: LoginComponent},
      { path: 'app/dashboard', component: DashboardComponentComponent},
      { path: 'app/holdings', component: CurrentHoldingsComponentComponent},
      { path: 'app/analysis', component: AnalysisComponentComponent},
      { path: 'app/strategies', component: StrategyBuilderComponentComponent},
    ]),
    TabMenuModule,
    DashboardComponentModule,
    StrategyBuilderComponentModule,
    CurrentHoldingsComponentModule,
    AnalysisComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
