import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from "../../../../../apps/riddet-app/src/environments/environment";
import { User } from './../user/user.model';

@Component({
  selector: 'riddet-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  loggedInUser$!: Observable<User | undefined>;
  subscription: Subscription | undefined;
  userId: string | null = null;
  users: User[] = [];
  following = false;
  loggedInProfile = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private http : HttpClient) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;

    this.subscription = this.authService.getAllUsers().subscribe((p) => {
      this.users = p;
    
      this.route.paramMap.subscribe(async params => {
        this.userId = params.get('id');
        if (this.userId) {
          if (this.users.filter(p => p._id.toString() === this.userId?.toString()).length > 0) {
            this.user = await this.authService.getById(this.userId).toPromise();

            if (this.loggedInUser$) {
              this.loggedInUser$.subscribe(async (p) => {
                if (p?._id.toString() === this.userId?.toString()) {
                  this.loggedInProfile = true;
                } else {
                  this.loggedInProfile = false;
                  await this.isFollowing();
                }
              })
            }
          } else {
            this.router.navigate(['/homepage']);
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateImgUrl() {
    this.user.image = 'https://cdn-icons-png.flaticon.com/512/33/33308.png';
  }

  follow() {
    this.authService.follow(this.userId as string).subscribe((p: any) => {
      if (p) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/profile/' + this.userId]));
      }
    });
  }

  unFollow() {
    this.authService.unfollow(this.userId as string).subscribe((p: any) => {
      if (p) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/profile/' + this.userId]));
      }
    });
  }

  async isFollowing() {
    this.following = await this.authService.following(this.userId as string);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(environment.SERVER_API_URL + '/users') as Observable<User[]>;
}

}