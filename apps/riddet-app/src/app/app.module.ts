import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '@riddet-app/ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunityDetailComponent } from './pages/communities/community-detail/community-detail.component';
import { CommunityEditComponent } from './pages/communities/community-edit/community-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommunityListComponent } from './pages/communities/community-list/community-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommunitiesComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    AboutComponent,
    CommunityDetailComponent,
    CommunityEditComponent,
    CommunityListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    NgbModule,
    UiModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
