
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ConfigService } from '@riddet-app/util-ui';
import { Observable } from "rxjs";
import { Community } from "./community.model";

@Injectable({providedIn: 'root',})
export class CommunityService {
     private community? : Community;

    constructor(private http : HttpClient, private configService : ConfigService) {}

      getList(): Observable<Community[]> {
        return this.http.get(this.configService.getApiEndpoint() + '/communities') as Observable<Community[]>;
      }

    getById(communityId: string):  Observable<Community> {
      return this.http.get(this.configService.getApiEndpoint() + '/communities/' + communityId) as Observable<Community>;
    }

    create(community: Community): void {
        this.community = { ...community };

        this.community.creationDate = new Date();
        this.community.isPublic = true;

        this.http.post(this.configService.getApiEndpoint() + '/communities', this.community).subscribe();

        console.log("Community aangemaakt");
      }
    
      update(updatedCommunity?: Community): void {
        this.http.patch(this.configService.getApiEndpoint() + '/communities/' + updatedCommunity?._id, updatedCommunity).subscribe();

        console.log("Community bewerkt");
      }

    delete(communityId: string) : void {
        this.http.delete(this.configService.getApiEndpoint() + '/communities/' + communityId).subscribe();
        console.log("Community verwijderd");
    }
}