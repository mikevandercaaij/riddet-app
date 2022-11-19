import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '@riddet-app/data';
import { Observable, Subscription } from 'rxjs';

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
    private http: HttpClient

  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.communityId = params.get('id')?.toString();
      this.community$ = this.http.get<Community>(`/api/communities/${this.communityId}`);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete() : void {
    this.http.delete(`/api/communities/${this.communityId}`).subscribe(() => {
      this.router.navigate(['/communities']);
    });
  }
}
