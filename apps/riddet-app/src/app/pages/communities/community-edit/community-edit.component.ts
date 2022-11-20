import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '@riddet-app/data';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CommunitiesHttpService } from '../services/communities.service';
@Component({
  selector: 'riddet-app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.css'],
})
export class CommunityEditComponent implements OnInit {
  title: string | undefined;
  editMode: boolean | undefined
  communityId: string | undefined
  community = new Community(uuidv4(), "", "", new Date(), "", true)
  submitted = false
  subscription?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communityService: CommunitiesHttpService,) {}

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
  }
    onSubmit() {
      this.submitted = true

      console.log("hoi")
   
      console.log('onSubmit: ', this.community)
      if (this.communityId) {
        this.communityService.update(this.community)
      } else {
        this.communityService.create(this.community);
      }
  
      this.router.navigate(['/communities'])
    }
}
