import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'riddet-app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] | undefined;
  communityId: string | undefined;
  threadId: string | undefined;

  constructor(private messageService: MessageService,
    private route : ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.communityId = params.get('communityId') as string;
    });

    this.route.paramMap.subscribe(params => {
      this.threadId = params.get('threadId') as string;
    });

    this.messageService.getList(this.communityId as string, this.threadId as string ).subscribe(messages => {
      this.messages = messages;
      console.log(this.messages)
    });
  }
}