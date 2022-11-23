import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunityService } from '../community.service';
import { Community } from './../community.model';
@Component({
  selector: 'riddet-app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.css'],
})
export class CommunityEditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  editMode: boolean | undefined
  communityId: string | undefined
  community: Community | undefined;
  subscription?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communityService: CommunityService,) {}

    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];

      if(this.editMode) {
        this.subscription = this.route.paramMap.subscribe((params) => {
          this.communityId = params.get('id')?.toString();
          
          if(this.communityId) {
            const community = this.communityService.getById(this.communityId);
            this.community = {...this.community, ...community};
          } 
        });
      } 
      else {
        this.community = new Community();
      }
    }

    ngOnDestroy(): void {
      this.subscription?.unsubscribe();
    }

    onSubmit() {
      if (this.communityId) {
        this.communityService.update(this.community)
        this.router.navigate(['/communities', this.communityId])
      } 
      else {
        this.communityService.create(this.community as Community);
        this.router.navigate(['/communities'])
      }
    }
}
