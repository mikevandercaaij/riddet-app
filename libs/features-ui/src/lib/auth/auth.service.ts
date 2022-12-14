import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@riddet-app/util-ui';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../user/user.model';
import { Role } from '../user/user.roles.enum';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/riddet-app/src/environments/environment';
import { Community } from '../community/community.model';

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
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router,
    private httpClient : HttpClient,
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
    console.log(`login at ${environment.SERVER_API_URL}/auth/login`);

    return this.http
      .post<User>(
        `${environment.SERVER_API_URL}/auth/login`,
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
    console.log(`register at ${environment.SERVER_API_URL}/auth/register`);
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
      .post<User>(`${environment.SERVER_API_URL}/auth/register`, user, {
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
    const url = `${environment.SERVER_API_URL}/auth/profile`;
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
    this.alertService.error('You have been logged out.');
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
      if(p) {
        token = p.access_token;
      }
    }).unsubscribe();

    return { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token})
    }
  }
  
  userMayEdit(itemUserId: string): boolean {
    let isAdmin;
    let isOwnerOfData;
    
    this.getUserFromLocalStorage().subscribe((user) => {
      isAdmin = user?.roles.includes(Role.Admin);
      isOwnerOfData = user?._id.toString() === itemUserId;
    }).unsubscribe();

    console.log(isAdmin || isOwnerOfData)
    return (isAdmin || isOwnerOfData) ? true : false;
  }

  isOwnerOfData(itemUserId: string): boolean {
    let isOwnerOfData;
    
    this.getUserFromLocalStorage().subscribe((user) => {
      isOwnerOfData = user?._id.toString() === itemUserId;
    }).unsubscribe();

    return (isOwnerOfData) ? true : false;
  }

  isOwnerOfCommunity(community: Community): boolean {
    let isOwnerOfData;
    
    this.getUserFromLocalStorage().subscribe((user) => {
        isOwnerOfData = community.createdBy._id.toString() === user?._id.toString();
    }).unsubscribe();

    return (isOwnerOfData) ? true : false;
  }


  async partOfCommunity(communityId: string): Promise<boolean> {
    let userId = '' as string | undefined;

    this.currentUser$.subscribe((p) => {
      userId = p?._id.toString();
    });

    const user = await this.getById(userId as string).toPromise();

    if(user) {
      if (user.joinedCommunities.filter(p => p.toString() === communityId.toString()).length > 0) {
        return true;
      }
    }
    return false
  }

  getById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.SERVER_API_URL}/users/${userId}`, this.getHttpOptions()) as Observable<User>;
  } 

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.SERVER_API_URL}/users`, this.getHttpOptions()) as Observable<User[]>;
  } 

  follow(userId: string): Observable<User> {
    return this.httpClient.post<User>(environment.SERVER_API_URL + `/users/${userId}/follow`, { null: null }, this.getHttpOptions()) as Observable<User>;
  }

  unfollow(userId: string): Observable<User> {
    return this.httpClient.post<User>(environment.SERVER_API_URL + `/users/${userId}/unfollow`, { null: null }, this.getHttpOptions()) as Observable<User>;
  }

  async following(userId: string): Promise<boolean> {
    let loggedInUserId = '' as string | undefined;
    let loggedInUser: User | undefined;

    this.currentUser$.subscribe((p) => {
      loggedInUserId = p?._id.toString();
    });

    if(loggedInUserId) {
    loggedInUser = await this.getById(loggedInUserId).toPromise();
    }
    if(loggedInUser) {
      if (loggedInUser.following.filter(p => p._id.toString() === userId.toString()).length > 0) {
        return true;
      } 
    } 
    
    return false;
  }
}
