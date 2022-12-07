// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { ThreadService } from '../thread.service';

import { Component } from "@angular/core";

@Component({
  selector: 'riddet-app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})


//implements OnInit, OnDestroy
export class MessageEditComponent {


//   title: string | undefined;
//   editMode: boolean | undefined
//   threadId: string | undefined
//   communityId: string | undefined
//   subs?: Subscription;
//   threadForm: FormGroup = new FormGroup({});

//     constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private threadService: ThreadService){}


//     ngOnInit(): void {
//       this.title = this.route.snapshot.data['title'] || undefined;
//       this.editMode = this.route.snapshot.data['editMode'];

//       this.subs = this.route.paramMap.subscribe((params) => {
//         this.communityId = params.get('communityId')?.toString()
//         console.log("id: " + this.communityId)
//       });

//       this.threadForm = new FormGroup({
//         title: new FormControl(null, [Validators.required, this.validTitle.bind(this)]),
//         content: new FormControl(null),
//         imageUrl: new FormControl(null, [Validators.required, this.validUrl.bind(this)]),
//         externLink: new FormControl(null, [Validators.required, this.validUrl.bind(this)])
//       });

//       if(this.editMode) {
//         this.subs = this.route.paramMap.subscribe((params) => {
//           this.threadId = params.get('threadId')?.toString()
//         });

//         this.subs = this.threadService.getById(this.communityId as string, this.threadId as string).subscribe((thread) => {
//           this.threadForm.patchValue({title: thread.title, content: thread.content, imageUrl: thread.imageUrl, externLink: thread.externLink});
//         });
//         }
//     }

//     ngOnDestroy(): void {
//       if (this.subs) {
//         this.subs.unsubscribe();
//       }
//     }

//     onSubmit() {
//       if (this.threadForm.valid) {
//         if(this.editMode) {
//           this.threadService.update(this.threadForm.value, this.communityId as string, this.threadId as string).subscribe((community) => {
//             if (community) {
//               this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]);
//             }
//           });
//         } else {
//           this.threadService.create(this.threadForm.value, this.communityId as string).subscribe((community) => {
//             if (community) {
//               this.router.navigate(['/communities', this.communityId]);
//             }
//           });
//         }
//       }
//     }


//     validUrl(control: FormControl): { [s: string]: boolean } {
//       const imageUrl = control.value;
//       const regexp = new RegExp('^(https?:\\/\\/)?'+
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
//       '((\\d{1,3}\\.){3}\\d{1,3}))'+
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
//       '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
//       '(\\#[-a-z\\d_]*)?$','i');

//       const regexp2 = new RegExp('^$');


//       console.log(regexp2.test(imageUrl) !== true)

//       if (regexp.test(imageUrl) !== true && regexp2.test(imageUrl) !== true) {
//         return { imageUrl: false };
//       } else {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         return null!
//       }
//     }

//     validTitle(control: FormControl): { [s: string]: boolean } {
//       const description = control.value;
//       const regexp = new RegExp(
//         '.{5,}'
//       );
  
//       if (regexp.test(description) !== true) {
//         return { description: false };
//       } else {
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         return null!;
//       }
//     }
}
