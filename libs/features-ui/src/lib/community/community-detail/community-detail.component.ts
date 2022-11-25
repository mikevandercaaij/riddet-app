import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommunityService } from '../community.service';
import { Community } from './../community.model';

@Component({
  selector: 'riddet-app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css'],
})
export class CommunityDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  communityId: string | undefined;
  community$: Observable<Community> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communityService: CommunityService

  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.communityId = params.get('id')?.toString();
      if(this.communityId) {
        this.community$ = this.communityService.getById(this.communityId);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete() : void {
    if(this.communityId) {
      this.communityService.delete(this.communityId);
      this.router.navigate(['/communities']);
    }
  }
}
