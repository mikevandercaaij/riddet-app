import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from '@riddet-app/ui';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoginComponent } from './auth/login/login.component';
import { CommunitiesComponent } from './communities/communities.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, CommunitiesComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    NgbModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
