
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AlertService, ConfigService } from '@riddet-app/util-ui';
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Community } from "./community.model";

@Injectable({providedIn: 'root',})
export class CommunityService {

    constructor(private http : HttpClient, private configService : ConfigService, private authService : AuthService, private alertService : AlertService ) {}

    getList(endpoint : string): Observable<Community[]> {
      return this.http.get(this.configService.getApiEndpoint() + endpoint, this.authService.getHttpOptions()) as Observable<Community[]>;
    }

    getById(communityId: string):  Observable<Community> {
      return this.http.get(this.configService.getApiEndpoint() + '/communities/' + communityId) as Observable<Community>;
    }


    create(communityData: object): Observable<Community | undefined> {
      console.log(`creating community at ${this.configService.getConfig().apiEndpoint}/communities`);
  
      return this.http
        .post<Community>(`${this.configService.getConfig().apiEndpoint}/communities`, communityData,
          this.authService.getHttpOptions()
        )
        .pipe(
          map((community) => {
            console.dir(community);
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
      console.log(`updating community at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}`);
    
      return this.http
        .patch<Community>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}`, communityData,
          this.authService.getHttpOptions()
        )
        .pipe(
          map((community) => {
            console.dir(community);
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
      console.log(`deleting community at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}`);
    
      return this.http
        .delete<Community>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}`, this.authService.getHttpOptions())
        .pipe(
          map((community) => {
            console.dir(community);
            this.alertService.error('Community has been deleted');
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