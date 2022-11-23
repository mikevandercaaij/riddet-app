import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadComponent } from './thread.component';

const routes: Routes = [
  { path: 'communities/:id/threads/new', component: ThreadEditComponent, data: { editMode: false, title: 'Thread aanmaken'}},
  { path: 'communities/:communityId/threads/:threadId', component: ThreadDetailComponent },
  { path: 'communities/:communityId/threads/:threadId/edit', component: ThreadEditComponent , data: { editMode: true, title: 'Thread bewerken' }},
];

@NgModule({
  declarations: [
    ThreadComponent,
    ThreadEditComponent,
    ThreadDetailComponent,
    ThreadListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [ThreadListComponent],
})
export class ThreadModule {}
