import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'riddet-app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrls: ['./thread-edit.component.css'],
})

export class ThreadEditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  editMode: boolean | undefined
  threadId: string | undefined
  communityId: string | undefined
  thread: Thread | undefined;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private threadService: ThreadService) {}

    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];
      this.communityId = this.route.snapshot.paramMap.get('communityId') as string;

      if(this.editMode) {
        this.subscription = this.route.paramMap.subscribe((params) => {
          this.threadId = params.get('threadId')?.toString();
          
          if(this.threadId) {
            const thread = this.threadService.getById(this.threadId);
            this.thread = {...this.thread, ...thread};
          } 
        });
      } 
      else {
        this.thread = new Thread();
        this.thread = {...this.thread, communityId: this.communityId as string} as Thread;
        console.log(this.thread);
      }
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    onSubmit() {
      if (this.threadId) {
        this.threadService.update(this.thread)
        this.router.navigate(['/communities', this.communityId, 'threads', this.threadId])
      } 
      else {
        this.threadService.create(this.thread as Thread);
        this.router.navigate(['/communities', this.communityId])
      }
    }
}
