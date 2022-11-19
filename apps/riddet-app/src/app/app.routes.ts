import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunityDetailComponent } from './pages/communities/community-detail/community-detail.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'communities', pathMatch: 'full', component: CommunitiesComponent },
  { path: 'communities/:id', component: CommunityDetailComponent },
  // { path: '**', pathMatch: 'full', component: AppComponent },
];
