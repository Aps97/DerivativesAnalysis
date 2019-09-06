import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RadioButtonModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { CurrentHoldingsComponentComponent } from './current-holdings-component/current-holdings-component.component';
import { StrategyBuilderComponentComponent } from './strategy-builder-component/strategy-builder-component.component';
import { AnalysisComponentComponent } from './analysis-component/analysis-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { HeaderComponent } from './header/header.component';
import { DashboardComponentModule } from './dashboard-component/dashboard-component.module';
import { StrategyBuilderComponentModule } from './strategy-builder-component/strategy-builder-component.module';
import { CurrentHoldingsComponentModule } from './current-holdings-component/current-holdings-component.module';
import { AnalysisComponentModule } from './analysis-component/analysis-component.module';
import { LoginComponent } from './login/login.component';
import {AutoCompleteModule} from 'primeng/autocomplete';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    CurrentHoldingsComponentComponent,
    StrategyBuilderComponentComponent,
    AnalysisComponentComponent,
    HeaderComponent,
    LoginComponent,
    AutoCompleteModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
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
export class AppModule { }
