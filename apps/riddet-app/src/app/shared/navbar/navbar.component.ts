import { Component, OnInit } from '@angular/core';
import { AuthService } from '@riddet-app/auth-ui';
import { User } from '@riddet-app/features-ui';
import { Observable } from 'rxjs';
@Component({
  selector: 'riddet-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedInUser$!: Observable<User | undefined>;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    console.log(this.loggedInUser$);
  }

  logout(): void {
    console.log('logout');
    console.log(this.loggedInUser$);
    this.authService.logout();
  }
}