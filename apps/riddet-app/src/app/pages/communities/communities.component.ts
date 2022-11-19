import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Community } from '@riddet-app/data';

@Component({
  selector: 'riddet-app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css'],
})
export class CommunitiesComponent implements OnInit {
  communities: Community[] = [];


  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Community[]>('/api/communities').subscribe((res) => this.communities = res);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}