import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageModule } from '../message/message.module';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadComponent } from './thread.component';

const routes: Routes = [
    { path: 'communities/:communityId/threads/new', component: ThreadEditComponent, title: 'Create Thread', data: { editMode: false, title: 'Create Thread'}},
    { path: 'communities/:communityId/threads/:threadId', component: ThreadDetailComponent, title: 'Thread details', },
    { path: 'communities/:communityId/threads/:threadId/edit', component: ThreadEditComponent, title: 'Edit Thread', data: { editMode: true, title: 'Edit Thread' }},
];

@NgModule({
    declarations: [
        ThreadComponent,
        ThreadEditComponent,
        ThreadDetailComponent,
        ThreadListComponent,
    ],
    exports: [ThreadListComponent],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule.forChild(routes),
        MessageModule,
    ]
})
export class ThreadModule {}
