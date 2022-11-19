import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunityDetailComponent } from './pages/communities/community-detail/community-detail.component';
import { CommunityEditComponent } from './pages/communities/community-edit/community-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
  { path: 'communities/:id', pathMatch: 'full', component: CommunityDetailComponent },
  { path: 'communities/:id/edit', pathMatch: 'full', component: CommunityEditComponent },
  { path: '**', pathMatch: 'full', component: DashboardComponent },
];
