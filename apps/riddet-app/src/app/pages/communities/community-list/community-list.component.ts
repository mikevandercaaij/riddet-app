import { Component, OnInit } from '@angular/core';
import { Community } from '@riddet-app/data';
import { Observable } from 'rxjs';
import { CommunitiesHttpService } from '../services/communities-http.service';
@Component({
  selector: 'riddet-app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
})
export class CommunityListComponent implements OnInit{
  communities$: Observable<Community[]> | undefined;


  constructor(private communityService: CommunitiesHttpService) {}

ngOnInit(): void {
  console.log('CommunityListComponent.ngOnInit()');
    this.communities$ = this.communityService.getList();
}

}
