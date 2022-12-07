import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'riddet-app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit {
  threads: Thread[]| undefined;

  constructor(private threadService: ThreadService,
    public authService : AuthService) {}

  @Input() communityId: string | undefined;

  ngOnInit(): void {
      this.threadService.getList(this.communityId as string).subscribe(async threads => {
        threads.sort(function(a, b) {
          return (a.publicationDate > b.publicationDate) ? -1 : ((a.publicationDate > b.publicationDate) ? 1 : 0);
      });
        this.threads = threads;
      });
  }
}