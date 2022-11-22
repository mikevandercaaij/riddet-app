import { Route } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '**', pathMatch: 'full', component: DashboardComponent },
];
