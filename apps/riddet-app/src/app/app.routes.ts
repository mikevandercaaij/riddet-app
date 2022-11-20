import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { CommunityDetailComponent } from './pages/communities/community-detail/community-detail.component';
import { CommunityEditComponent } from './pages/communities/community-edit/community-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'communities', component: CommunitiesComponent,},
  { path: 'communities/:id', component: CommunityDetailComponent },
  { path: 'communities/:id/edit', component: CommunityEditComponent , data: { editMode: true, title: 'Community bewerken' }},
  { path: 'create', component: CommunityEditComponent, data: { editMode: false, title: 'Community aanmaken'}},
  
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: '**', pathMatch: 'full', component: DashboardComponent },
];
