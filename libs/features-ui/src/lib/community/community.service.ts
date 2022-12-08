
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AlertService } from '@riddet-app/util-ui';
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Community } from "./community.model";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from "../../../../../apps/riddet-app/src/environments/environment";

@Injectable({providedIn: 'root',})
export class CommunityService {

    constructor(private http : HttpClient, private authService : AuthService, private alertService : AlertService ) {}

    getList(endpoint : string): Observable<Community[]> {
      return this.http.get(environment.SERVER_API_URL + endpoint, this.authService.getHttpOptions()) as Observable<Community[]>;
    }

    getById(communityId: string):  Observable<Community> {
      return this.http.get(environment.SERVER_API_URL + '/communities/' + communityId) as Observable<Community>;
    }

    create(communityData: object): Observable<Community | undefined> {
      return this.http
        .post<Community>(`${environment.SERVER_API_URL}/communities`, communityData,
          this.authService.getHttpOptions()
        )
        .pipe(
          map((community) => {
            this.alertService.success('Community has been created');
            return community;
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

    update(communityData: object, communityId : string): Observable<Community | undefined> {
      return this.http
        .patch<Community>(`${environment.SERVER_API_URL}/communities/${communityId}`, communityData,
          this.authService.getHttpOptions()
        )
        .pipe(
          map((community) => {
            this.alertService.success('Community has been updated');
            return community;
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


    delete(communityId : string): Observable<Community | undefined> {
      return this.http
        .delete<Community>(`${environment.SERVER_API_URL}/communities/${communityId}`, this.authService.getHttpOptions())
        .pipe(
          map((community) => {
            this.alertService.success('Community has been deleted');
            return community;
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


    join(communityId: string): Observable<Community | undefined> {
      return this.http
          .post<Community>(`${environment.SERVER_API_URL}/communities/${communityId}/join`, { null: null },
              this.authService.getHttpOptions()
          )
          .pipe(
              map((community) => {
                  this.alertService.success('You have joined the community');
                  return community;
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

  leave(communityId: string): Observable<Community | undefined> {
      return this.http
          .post<Community>(`${environment.SERVER_API_URL}/communities/${communityId}/leave`,
              { null: null },
              this.authService.getHttpOptions()
          )
          .pipe(
              map((community) => {
                  this.alertService.success('You have left the community');
                  return community;
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
}