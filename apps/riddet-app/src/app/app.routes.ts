import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: AppComponent },
];
