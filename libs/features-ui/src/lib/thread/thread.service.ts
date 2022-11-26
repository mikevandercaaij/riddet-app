
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from '@riddet-app/util-ui';
import { Observable } from "rxjs";
import { Thread } from "./thread.model";
@Injectable({providedIn: 'root',})
export class ThreadService {
    private thread? : Thread

    constructor(private http : HttpClient, private configService : ConfigService) {}
  
    getList(): Observable<Thread[]> {
        return this.http.get(this.configService.getApiEndpoint() + '/threads') as Observable<Thread[]>;
    }

    getListByCommunityId(communityId : string): Observable<Thread[]> {
      return this.http.get(this.configService.getApiEndpoint() + '/threads/communities/' + communityId) as Observable<Thread[]>;
  }

    getById(threadId: string): Observable<Thread> {
      return this.http.get(this.configService.getApiEndpoint() + '/threads/' + threadId) as Observable<Thread>;
    }

    create(thread: Thread): void {
        this.thread = { ...thread };

        this.thread.publicationDate = new Date();

        this.http.post(this.configService.getApiEndpoint() + '/threads', this.thread).subscribe();

        console.log("Thread aangemaakt");
      }
    
      update(updatedThread?: Thread): void {
        this.http.patch(this.configService.getApiEndpoint() + '/threads/' + updatedThread?._id, updatedThread).subscribe();

        console.log("Thread bewerkt");
      }

    delete(threadId: string) : void {
        this.http.delete(this.configService.getApiEndpoint() + '/threads/' + threadId).subscribe();
        console.log("Thread verwijderd");
    }
}