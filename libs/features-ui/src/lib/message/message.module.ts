import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [
    MessageEditComponent,
    MessageListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  exports: [MessageListComponent, MessageEditComponent],
})
export class MessageModule {}
