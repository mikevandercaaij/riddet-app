import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Types } from 'mongoose';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user.model';
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
  upvoted = false;
  loggedInUser$: Observable<User|undefined> = new Observable<User|undefined>();

  constructor(
    private threadService: ThreadService,    
    private route: ActivatedRoute,
    private router: Router,
    public authService : AuthService
    ) {}

    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];

      this.loggedInUser$ = this.authService.currentUser$;

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
      this.thread = await this.threadService.getById(this.communityId?.toString() as string, this.threadId?.toString() as string).toPromise();
      this.creatorId = this.thread.createdBy._id;

      const likes = this.thread.upvotes as Types.ObjectId[];

      if (this.loggedInUser$) {
        this.loggedInUser$.subscribe((p) => {

          console.log()

          if (likes.filter(l => l.toString() === p?._id.toString()).length > 0) {
            this.upvoted = true;
          } else {
            this.upvoted = false;
          }
        })
      }
    }
  }

  upvote() {
      this.threadService.upvote(this.communityId as string, this.threadId as string).subscribe((p) => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/communities/' + this.communityId + '/threads/' + this.threadId]));
    });
  }
}

