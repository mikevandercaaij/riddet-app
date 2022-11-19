import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Community } from '@riddet-app/data';
@Component({
  selector: 'riddet-app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
})
export class CommunityListComponent {
  communities: Community[] = [];


  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Community[]>('/api/communities').subscribe((res) => this.communities = res);
  }
}
