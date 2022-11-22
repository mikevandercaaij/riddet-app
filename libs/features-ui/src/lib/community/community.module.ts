import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThreadModule } from "../thread/thread.module";
import { CommunityDetailComponent } from "./community-detail/community-detail.component";
import { CommunityEditComponent } from "./community-edit/community-edit.component";
import { CommunityListComponent } from "./community-list/community-list.component";
import { CommunityComponent } from "./community.component";


const routes: Routes = [
{ path: 'communities', component: CommunityComponent},
{ path: 'communities/new', component: CommunityEditComponent, data: { editMode: false, title: 'Community aanmaken'}},  
{ path: 'communities/:id', component: CommunityDetailComponent },
{ path: 'communities/:id/edit', component: CommunityEditComponent , data: { editMode: true, title: 'Community bewerken' }},
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
    ]
})
  
  export class CommunityModule {}