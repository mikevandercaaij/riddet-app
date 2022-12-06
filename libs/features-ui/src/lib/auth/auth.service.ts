import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, ConfigService } from '@riddet-app/util-ui';
import { Types } from 'mongoose';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private configService: ConfigService,
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
 
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User | undefined) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(username: string, password: string): Observable<User | undefined> {
    console.log(`login at ${this.configService.getConfig().apiEndpoint}/auth/login`);

    return this.http
      .post<User>(
        `${this.configService.getConfig().apiEndpoint}/auth/login`,
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((err: any) => {
          console.log('error:', err);
          console.log('error.message:', err.message);
          console.log('error.error.message:', err.error.message);
          this.alertService.error(err.error.message || err.message);
          return of(undefined);
        })
      );
  }

  register(userData: User): Observable<User | undefined> {
    console.log(`register at ${this.configService.getConfig().apiEndpoint}/auth/register`);
    console.log(userData);

    const anyDate = userData.dateOfBirth as any;

    if(anyDate.month.toString().length === 1) {
      anyDate.month = '0' + anyDate.month;
    }

    if(anyDate.day.toString().length === 1) {
      anyDate.day = '0' + anyDate.day;
    }

    const user = {
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      dateOfBirth: anyDate?.year + '-' + anyDate?.month + '-' + anyDate?.day,
      email: userData.email,
      userImageUrl: userData.userImageUrl,
      password: userData.password
    }

    console.log(user.dateOfBirth)

    console.log(user)

    return this.http
      .post<User>(`${this.configService.getConfig().apiEndpoint}/auth/register`, user, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined); 
        })
      );
  }

  validateToken(userData: User): Observable<User | undefined> {
    const url = `${this.configService.getConfig().apiEndpoint}/auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.access_token,
      }),
    };
    console.log(`validateToken at ${url}`);
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError(() => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(undefined);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.router.navigate(['/']);
    console.log('logout - removing local user info');
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUser$.next(undefined);
    this.alertService.success('You have been logged out.');
}

  getUserFromLocalStorage(): Observable<User> {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
      return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  getHttpOptions(): object {
    let token;
    this.getUserFromLocalStorage().subscribe((p) => {
      token = p.access_token;
    }).unsubscribe();

    return { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token})
    }
  }


  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: User | undefined) => (user ? user._id.equals(new Types.ObjectId(itemUserId)) : false))
    );
  }
}
