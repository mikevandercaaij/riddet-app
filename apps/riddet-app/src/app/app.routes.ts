import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommunitiesComponent } from './communities/communities.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
  // { path: '**', pathMatch: 'full', component: AppComponent },
];
