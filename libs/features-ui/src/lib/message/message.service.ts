
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService, ConfigService } from '@riddet-app/util-ui';
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Message } from "./message.model";
@Injectable({providedIn: 'root',})
export class MessageService {

    constructor(private http : HttpClient, 
      private configService : ConfigService,
      private alertService : AlertService,
      private authService : AuthService) {}
  
    getList(communityId : string, threadId : string): Observable<Message[]> {
      return this.http.get(`${this.configService.getApiEndpoint()}/communities/${communityId}/threads/${threadId}/messages`) as Observable<Message[]>;
    }

//     getById(communityId :string, threadId: string): Observable<Thread> {
//       return this.http.get(`${this.configService.getApiEndpoint()}/communities/${communityId}/threads/${threadId}`) as Observable<Thread>;
//     }

//     create(threadData: Thread, communityId : string): Observable<Thread | undefined> {
//       console.log(`creating thread at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads`);
  
//       return this.http
//         .post<Thread>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads`, threadData,
//           this.authService.getHttpOptions())
//         .pipe(
//           map((thread) => {
//             console.dir(thread);
//             this.alertService.success('Thread has been created');
//             return thread;
//           }),
//           catchError((error: any) => {
//             console.log('error:', error);
//             console.log('error.message:', error.message);
//             console.log('error.error.message:', error.error.message);
//             this.alertService.error(error.error.message || error.message);
//             return of(undefined); 
//           })
//         );
//     }

//     update(threadData: Thread, communityId : string, threadId : string): Observable<Thread | undefined> {
//       console.log(`updating thread at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}`);
  
//       return this.http
//         .patch<Thread>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}`, threadData,
//           this.authService.getHttpOptions())
//         .pipe(
//           map((thread) => {
//             console.dir(thread);
//             this.alertService.success('Thread has been updated');
//             return thread;
//           }),
//           catchError((error: any) => {
//             console.log('error:', error);
//             console.log('error.message:', error.message);
//             console.log('error.error.message:', error.error.message);
//             this.alertService.error(error.error.message || error.message);
//             return of(undefined); 
//           })
//         );
//     }

//     delete(communityId : string, threadId : string): Observable<Thread | undefined> {
//       console.log(`deleting thread at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}`);
    
//       return this.http
//         .delete<Thread>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}`, this.authService.getHttpOptions())
//         .pipe(
//           map((community) => {
//             console.dir(community);
//             this.alertService.error('Thread has been deleted');
//             return community;
//           }),
//           catchError((error: any) => {
//             console.log('error:', error);
//             console.log('error.message:', error.message);
//             console.log('error.error.message:', error.error.message);
//             this.alertService.error(error.error.message || error.message);
//             return of(undefined); 
//           })
//         );
//     }
}
