import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@riddet-app/util-ui';
import { Subscription } from 'rxjs';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { Community } from '../community.model';
import { CommunityService } from '../community.service';
@Component({
  selector: 'riddet-app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.css'],
})
export class CommunityEditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  editMode: boolean | undefined
  subs?: Subscription;
  communityForm: FormGroup = new FormGroup({});
  communityId : string | undefined;
  selectedCategories: string[] = [];
  categories: Category[] | undefined
  community: Community | undefined;
  chosenCategories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communityService: CommunityService,
    private categoryService : CategoryService,
    private alertService : AlertService) {}

    async ngOnInit(): Promise<void> {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];

      this.subs = this.categoryService.getAll().subscribe((categories) => {
        this.categories = categories;
      });

      if(this.editMode) {
        this.subs = this.route.paramMap.subscribe((params) => {
          this.communityId = params.get('id')?.toString()
        });
           

        this.communityForm = new FormGroup({
          name: new FormControl(null, [Validators.required, this.validName.bind(this)]),
          description: new FormControl(null, [Validators.required, this.validDescription.bind(this)]),
          imageUrl: new FormControl(null, [Validators.required, this.validImageUrl.bind(this)]),
          isPublic: new FormControl(false),
        });

        this.subs = this.communityService.getById(this.communityId as string).subscribe((community) => {


          this.community = community;

        this.community.categories.forEach(selectedCategory => {
          this.chosenCategories.push(selectedCategory);
          this.selectedCategories.push(selectedCategory._id.toString());
        });

          this.chosenCategories.forEach(chosen => {
          this.categories = this.categories?.filter(p => p._id.toString() !== chosen._id.toString());
        });

          this.communityForm.patchValue({name: community.name, description: community.description, imageUrl: community.imageUrl, isPublic: community.isPublic});
        });
      } 
      else {
        this.communityForm = new FormGroup({
          name: new FormControl(null, [Validators.required, this.validName.bind(this)]),
          description: new FormControl(null, [Validators.required, this.validDescription.bind(this)]),
          imageUrl: new FormControl(null, [Validators.required, this.validImageUrl.bind(this)]),
          isPublic: new FormControl(false),
        });
      }
    }

    ngOnDestroy(): void {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

    onSubmit() {
      if (this.communityForm.valid) {
      if(this.selectedCategories.length === 0) {
         this.alertService.error('You must select at least one category!');
      } else {
        const community = {...(this.communityForm.value as Community), categories: this.selectedCategories};

        if(this.editMode) {
          this.communityService.update(community, this.communityId as string).subscribe((community) => {
            if (community) {
              this.router.navigate(['/communities', this.communityId]);
            }
          });
        } else {
          this.communityService.create(community).subscribe((community) => {
            if (community) {
              this.router.navigate(['/communities', 'created']);
            }
          });
        }
      }
    }
  }

  validImageUrl(control: FormControl): { [s: string]: boolean } {
    const imageUrl = control.value;
    const regexp = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
    if (regexp.test(imageUrl) !== true) {
      return { imageUrl: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!
    }
  }

  validName(control: FormControl): { [s: string]: boolean } {
    const name = control.value;
    const regexp = new RegExp(
      '.{5,}'
    );

    if (regexp.test(name) !== true) {
      return { name: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!;
    }
  }

  validDescription(control: FormControl): { [s: string]: boolean } {
    const description = control.value;
    const regexp = new RegExp(
      '.{10,}'
    );

    if (regexp.test(description) !== true) {
      return { description: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!;
    }
  }

  onChange(_id: string) {
    if (this.selectedCategories?.includes(_id)) {
      this.selectedCategories = this.selectedCategories.filter(p => p !== _id);
    } else {
      this.selectedCategories?.push(_id);
    }
    console.log(this.selectedCategories)
  }
}
