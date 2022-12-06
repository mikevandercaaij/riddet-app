import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthUiModule } from "../auth/auth-ui.module";
import { LoggedInAuthGuard } from "../auth/auth.guards";
import { ThreadModule } from "../thread/thread.module";
import { CommunityDetailComponent } from "./community-detail/community-detail.component";
import { CommunityEditComponent } from "./community-edit/community-edit.component";
import { CommunityListComponent } from "./community-list/community-list.component";
import { CommunityComponent } from "./community.component";


const routes: Routes = [
{ path: 'communities',  component: CommunityComponent, children: [
    { path: '', component: CommunityListComponent, title: 'All Communities', data: { overviewType: 'all' } },
    { path: 'created', component: CommunityListComponent, canActivate: [LoggedInAuthGuard], title: 'Created Communities', data: { overviewType: 'created' } },
    { path: 'joined', component: CommunityListComponent, canActivate: [LoggedInAuthGuard], title: 'Joined Communities', data: { overviewType: 'joined' } },
    { path: 'new', component: CommunityEditComponent, canActivate: [LoggedInAuthGuard], title: 'Create Community', data: { editMode: false, title: 'Create Community'}},  
    { path: ':id', component: CommunityDetailComponent, title: 'Community details', },
    { path: ':id/edit', component: CommunityEditComponent, canActivate: [LoggedInAuthGuard], title: 'Edit Community', data: { editMode: true, title: 'Edit Community' }},
]},
]

@NgModule({
    declarations: [
        CommunityComponent,
        CommunityDetailComponent,
        CommunityEditComponent,
        CommunityEditComponent,
        CommunityListComponent,
        
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule.forChild(routes),
        ThreadModule,
        AuthUiModule
    ]
})
  
  export class CommunityModule {}