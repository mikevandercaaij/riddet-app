import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'riddet-app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] | undefined;

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




  // ngOnInit(): void {
  //     this.messageService.getList(this.communityId as string, this.communityId as string ).subscribe(messages => {
  //       messages.sort(function(a, b) {
  //         return (a.publicationDate > b.publicationDate) ? -1 : ((a.publicationDate > b.publicationDate) ? 1 : 0);
  //     });

  //       console.log(messages);
  //       this.messages = messages;
  //     });
  // }
}