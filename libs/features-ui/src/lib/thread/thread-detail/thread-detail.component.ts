import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'riddet-app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css'],
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  thread$: Observable<Thread> | undefined
  subscription?: Subscription;
  threadId: string | undefined;
  communityId: string | undefined

  constructor(
    private threadService: ThreadService,    
    private route: ActivatedRoute,
    private router: Router) {}


  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.threadId = params.get('threadId')?.toString();
      this.communityId = params.get('communityId')?.toString();
      
      if(this.threadId) {
        this.thread$ = this.threadService.getById(this.threadId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete() : void {
    if(this.threadId) {
      this.threadService.delete(this.threadId);
      this.router.navigate(['/communities/', this.communityId]);
    }
  }
}

