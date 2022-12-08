// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { ThreadService } from '../thread.service';

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "../message.service";

@Component({
  selector: 'riddet-app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})


export class MessageEditComponent implements OnInit, OnDestroy {
  title: string | undefined;
  editMode: boolean | undefined
  threadId: string | undefined
  communityId: string | undefined
  messageId: string | undefined
  subs?: Subscription;
  messageForm: FormGroup = new FormGroup({});

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService){}


    ngOnInit(): void {
      this.title = this.route.snapshot.data['title'] || undefined;
      this.editMode = this.route.snapshot.data['editMode'];

      console.log(this.editMode)


      this.subs = this.route.paramMap.subscribe((params) => {
        this.communityId = params.get('communityId')?.toString()
        this.threadId = params.get('threadId')?.toString()
      });

      this.messageForm = new FormGroup({
        text: new FormControl(null, [Validators.required, this.validText.bind(this)]),
      });


      if(this.editMode) {
        (document.getElementById('navbarNavDropdown') as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

        this.subs = this.route.paramMap.subscribe((params) => {
          this.messageId = params.get('messageId')?.toString()
        });

        this.subs = this.messageService.getById(this.communityId as string, this.threadId as string, this.messageId as string).subscribe((message) => {
          this.messageForm.patchValue({text: message.text});
        });
        }
    }

    ngOnDestroy(): void {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

    onSubmit() {
      if (this.messageForm.valid) {
        if(this.editMode) {
          this.messageService.update(this.messageForm.value, this.communityId as string, this.threadId as string, this.messageId as string).subscribe((message) => {
            if (message) {
              this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]);
            }
          });
        } else {
          this.messageService.create(this.messageForm.value, this.communityId as string, this.threadId as string).subscribe((message) => {
            if (message) {
              this.router.navigateByUrl('/reload').then(() => this.router.navigate(['/communities', this.communityId, 'threads', this.threadId]))
            }
          });
        }
      }
    }

    validText(control: FormControl): { [s: string]: boolean } {
      const text = control.value;
      const regexp = new RegExp(
        '.{1,}'
      );
  
      if (regexp.test(text) !== true) {
        return { text: false };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return null!;
      }
    }
}
