import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'riddet-app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css'],
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  thread: any | undefined
  subscription?: Subscription;
  threadId: string | null = null;
  communityId: string | null = null;
  creatorId  = '';
  editMode = false;
  title = '';

  constructor(
    private threadService: ThreadService,    
    private route: ActivatedRoute,
    private router: Router,
    public authService : AuthService
    ) {}

    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];

      this.subscription = this.route.paramMap.subscribe(async params => {
        this.threadId = params.get('threadId');
        this.communityId = params.get('communityId');
        
        await this.init();
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

  async init() {
    if (this.threadId) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      this.thread = await this.threadService.getById(this.communityId!.toString(), this.threadId?.toString()!).toPromise();
      this.creatorId = this.thread.createdBy._id;
    }
  }
}

