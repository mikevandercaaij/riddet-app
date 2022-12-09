
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
  
    async getList(communityId : string, threadId : string): Promise<any[]> {
      const returnArray : any[] = [];
      let messagesAny : any[] = [];

      const messages = await this.http.get<Message[]>(`${this.configService.getApiEndpoint()}/communities/${communityId}/threads/${threadId}/messages`).toPromise()
        if(messages) {
          messages.sort((a, b) => {
            return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
          });
          messagesAny = messages as any[]
        }
      const users = await this.http.get(`${this.configService.getApiEndpoint()}/users`).toPromise()
      const usersAny = users as any[]

      for await (const message of messagesAny) {
        for await (const user of usersAny) {
          if (message.createdBy.toString() === user._id.toString()) {
            delete message.createdBy
            message.createdBy = user
            returnArray.push(message)
          }
        }
      }

      return returnArray
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
      console.log(`liking/unliking messsage at ${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}/like`);
    
      return this.http
        .post<Message>(`${this.configService.getConfig().apiEndpoint}/communities/${communityId}/threads/${threadId}/messages/${messageId}/like`, {}, this.authService.getHttpOptions())
        .pipe(
          map((message) => {
            console.dir(message);
            this.alertService.success('Liked/unliked message');
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
