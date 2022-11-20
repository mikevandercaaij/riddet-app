import { Component, OnInit } from '@angular/core';
import { Community } from '@riddet-app/data';
import { CommunitiesHttpService } from '../services/communities.service';
@Component({
  selector: 'riddet-app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
})
export class CommunityListComponent implements OnInit{
  communities: Community[] | undefined;


  constructor(private communityService: CommunitiesHttpService) {}

ngOnInit(): void {
    this.communities = this.communityService.getList();
}

}
