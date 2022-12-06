import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunityService } from '../community.service';
import { Community } from './../community.model';
  @Component({
    selector: 'riddet-app-community-list',
    templateUrl: './community-list.component.html',
    styleUrls: ['./community-list.component.css'],
  })
  export class CommunityListComponent implements OnInit{
    communities: Community[] | undefined;
    subscription: Subscription | undefined;
    type: string | undefined;

    constructor(private communityService: CommunityService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.data['overviewType'] || undefined;

    if (this.type === 'all') {
      this.subscription = this.communityService.getList("/communities").subscribe((communities) => (this.communities = communities));
    } else if (this.type === 'created') {
      
      this.subscription = this.communityService.getList("/communities/created").subscribe((communities) => (this.communities = communities));
    } else if (this.type === 'joined') {
      this.subscription = this.communityService.getList("/communities/joined").subscribe((communities) => (this.communities = communities));
    }
  }
}
