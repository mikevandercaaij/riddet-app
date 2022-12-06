import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthUiModule, CommunityModule, ThreadModule } from '@riddet-app/features-ui';
import { AlertModule, ConfigModule } from '@riddet-app/util-ui';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Riddet | ${title}`);
    }
  }
}

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
  providers: [{provide: TitleStrategy, useClass: TemplatePageTitleStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
