import { AuthGuard } from './auth.guard';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RadioButtonModule, TooltipModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
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
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';


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
    ChartModule,
    TooltipModule,
    HttpClientModule,
    AccordionModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    BrowserAnimationsModule,
    ButtonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      { path: 'app/dashboard', component: DashboardComponentComponent, canActivate: [AuthGuard]},
      { path: 'app/holdings', component: CurrentHoldingsComponentComponent, canActivate: [AuthGuard]},
      { path: 'app/analysis', component: AnalysisComponentComponent, canActivate: [AuthGuard]},
      { path: 'app/strategies', component: StrategyBuilderComponentComponent, canActivate: [AuthGuard]},
      { path: 'app/dashboard', redirectTo: '/holdings'},
      { path: '**', redirectTo: '/login'}
    ]),
    TabMenuModule,
    DashboardComponentModule,
    StrategyBuilderComponentModule,
    CurrentHoldingsComponentModule,
    AnalysisComponentModule,
    MessageModule,
    MessagesModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [
    DataService,
    LoginService,
    MessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
