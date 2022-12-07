import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessageListComponent } from './message-list/message-list.component';

// const routes: Routes = [
//     { path: 'communities/:communityId/threads/:threadId/messages', component: ThreadDetailComponent},
//     { path: 'communities/:communityId/threads/:threadId/messages/edit', component: ThreadEditComponent, data: { editMode: true, title: 'Edit Message' }},
// ];

@NgModule({
  declarations: [
    MessageEditComponent,
    MessageListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // RouterModule.forChild(routes),
  ],
  providers: [],
  exports: [MessageListComponent],
})
export class MessageModule {}
