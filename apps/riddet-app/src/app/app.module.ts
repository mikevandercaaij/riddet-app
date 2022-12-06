import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthUiModule } from '@riddet-app/auth-ui';
import { CommunityModule, ThreadModule } from '@riddet-app/features-ui';
import { AlertModule, ConfigModule } from '@riddet-app/util-ui';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ConfigModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
    NgbModule,
    HttpClientModule,
    CommunityModule,
    ThreadModule,
    AuthUiModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
