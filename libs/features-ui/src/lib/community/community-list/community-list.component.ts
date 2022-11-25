import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunityService } from '../community.service';
import { Community } from './../community.model';
  @Component({
    selector: 'riddet-app-community-list',
    templateUrl: './community-list.component.html',
    styleUrls: ['./community-list.component.css'],
  })
  export class CommunityListComponent implements OnInit{
    communities$: Observable<Community[]> | undefined;

    constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
      this.communities$ = this.communityService.getList();
  }
}
