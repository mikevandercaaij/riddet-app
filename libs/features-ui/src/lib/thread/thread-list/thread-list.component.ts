import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'riddet-app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit {
  threads$: Observable<Thread[]> | undefined;

  constructor(private threadService: ThreadService) {}

  @Input() communityId: string | undefined;

  ngOnInit(): void {
      this.threads$ = this.threadService.getList(this.communityId as string);
  }
}