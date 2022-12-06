import { Route } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: 'about', pathMatch: 'full', title: "About", component: AboutComponent },
  { path: '**', pathMatch: 'full', title: "Dashboard", component: DashboardComponent },
];
