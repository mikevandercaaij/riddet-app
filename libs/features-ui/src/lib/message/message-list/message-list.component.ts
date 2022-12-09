import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'riddet-app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: any[] | undefined;
  communityId: string | undefined;
  threadId: string | undefined;
  likes = 0;
  loggedInUser$!: Observable<User | undefined>;



  constructor(private messageService: MessageService,
    private route : ActivatedRoute,
    private router : Router,
    public authService: AuthService
    ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.communityId = params.get('communityId') as string;
    });

    this.route.paramMap.subscribe(params => {
      this.threadId = params.get('threadId') as string;
    });
    
    this.loggedInUser$ = this.authService.currentUser$;
    
    (async () => {
      this.messages = await this.messageService.getList(this.communityId as string, this.threadId as string );
    })();

}

  convertDate(date: Date) {
    return new Date(date).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  edit(messageId : string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/communities', this.communityId, 'threads', this.threadId, 'messages', messageId, 'edit' ]));
  }

  delete(messageId : string): void {
    console.log("delete message: " + messageId)

    this.messageService.delete(this.communityId as string, this.threadId as string, messageId).subscribe((message) => {
      if (message) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]));
      }
    });
  }

  like(messageId: string) {
    this.messageService.like(this.communityId as string, this.threadId as string, messageId).subscribe((message) => {
      if (message) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]));
      }
    });
  }
}