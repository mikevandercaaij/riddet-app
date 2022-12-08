
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService, ConfigService } from '@riddet-app/util-ui';
import { catchError, map, Observable, of } from "rxjs";
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

    getById(communityId :string, threadId: string, messageId: string): Observable<Message> {
      return this.http.get(`${this.configService.getApiEndpoint()}/communities/${communityId}/threads/${threadId}/messages/${messageId}`) as Observable<Message>;
    }

    create(messageData: Message, communityId : string, threadId: string): Observable<Message | undefined> {
      console.log(`creating message at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages`);
  
    return this.http
      .post<Message>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages`, messageData,
        this.authService.getHttpOptions())
      .pipe(
        map((message) => {
          console.dir(message);
          this.alertService.success('Message has been created');
          return message;
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

    update(messageData: Message, communityId : string, threadId : string, messageId: string): Observable<Message | undefined> {
      console.log(`updating message at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}`);
  
      return this.http
        .patch<Message>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}`, messageData,
          this.authService.getHttpOptions())
        .pipe(
          map((message) => {
            console.dir(message);
            this.alertService.success('Message has been updated');
            return message;
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

    delete(communityId : string, threadId : string, messageId : string): Observable<Message | undefined> {
      console.log(`deleting messsage at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}`);
    
      return this.http
        .delete<Message>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}`, this.authService.getHttpOptions())
        .pipe(
          map((message) => {
            console.dir(message);
            this.alertService.error('Thread has been deleted');
            return message;
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


    like(communityId : string, threadId : string, messageId : string): Observable<Message | undefined> {
      console.log(`deleting messsage at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}/like`);
    
      return this.http
        .delete<Message>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}/like`, this.authService.getHttpOptions())
        .pipe(
          map((message) => {
            console.dir(message);
            this.alertService.error('Liked/disliked message');
            return message;
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
