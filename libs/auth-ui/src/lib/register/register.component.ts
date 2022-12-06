import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'riddet-app-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  subs: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required, this.validBirthdate.bind(this)]),
      username: new FormControl(null, [Validators.required, this.validUsername.bind(this),]),
      email: new FormControl(null, [Validators.required, this.validEmail.bind(this)]),
      userImageUrl: new FormControl(null, [Validators.required, this.validImageUrl.bind(this)]),
      password: new FormControl(null, [Validators.required, this.validPassword.bind(this)]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((user) => {
        if (user) {
          console.log('user = ', user);
          this.router.navigate(['/']);
        }
      });
    } else {
      console.error('registerForm invalid');
    }
  }

  validBirthdate(control: FormControl): { [s: string]: boolean } {
    const birthdate = control.value;

    const dateString = birthdate?.year + '-' + birthdate?.month + '-' + birthdate?.day;

    if (new Date(dateString) > new Date()) {
        return { birthdate: false };
    }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!;
  }

  validUsername(control: FormControl): { [s: string]: boolean } {
    const username = control.value;
    const regexp = new RegExp(
      '.{5,}'
    );

    if (regexp.test(username) !== true) {
      return { username: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!;
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } {
    const email = control.value;
    const regexp = new RegExp('^[^@]+@[^@]+\\.[^@]+$');
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!
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

  validPassword(control: FormControl): { [s: string]: boolean } {
    const password = control.value;
    const regexp = new RegExp(
      '.{8,}'
    );

    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return null!;
    }
  }
}