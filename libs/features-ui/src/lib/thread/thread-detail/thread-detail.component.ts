import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
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
    private router: Router,
    public authService : AuthService
    ) {}


  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.threadId = params.get('threadId')?.toString();
      this.communityId = params.get('communityId')?.toString();
      
      if(this.threadId) {
        this.thread$ = this.threadService.getById(this.communityId as string, this.threadId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete() : void {
    if(this.communityId && this.threadId) {
      this.threadService.delete(this.communityId as string, this.threadId).subscribe((thread) => {
        if (thread) {
          this.router.navigate(['/communities', this.communityId]);
        }
      });
    }
  }
}

