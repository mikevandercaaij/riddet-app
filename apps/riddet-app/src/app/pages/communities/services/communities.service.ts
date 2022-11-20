
import { Injectable } from "@angular/core";
import { Community } from "@riddet-app/data";
import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root',})
export class CommunitiesHttpService {
     private community? : Community;
     private communityList: Community[] = [
        {
            "_id": uuidv4(),
            "name": "Eerstejaars studenten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "creationDate": new Date(),
            "imageUrl": "https://cdn.dribbble.com/users/5745266/screenshots/13977782/media/1bd8a00b559752b86996197fcd7645dd.png?compress=1&resize=400x300&vertical=top",
            "isPublic": true
        },
        {
            "_id": uuidv4(),
            "name": "Tweedejaars studenten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "creationDate": new Date(),
            "imageUrl": "https://cdn.dribbble.com/users/5745266/screenshots/13977782/media/1bd8a00b559752b86996197fcd7645dd.png?compress=1&resize=400x300&vertical=top",
            "isPublic": true
        },
    ];

    getList(): Community[] {
        return this.communityList;
      }

    getById(communityId: string):  Community {
        return this.communityList.filter(community => community._id === communityId)[0];
    }

    create(community: Community): void {
        this.community = { ...community };

        this.community._id = uuidv4();
        this.community.creationDate = new Date();
        this.community.isPublic = true;

        this.communityList.push(this.community);

        console.log("Community aangemaakt");
      }
    
      update(updatedCommunity?: Community): void {
        this.communityList.map(community => {
          if (community._id === updatedCommunity?._id) {
            return {community, ...updatedCommunity};
          }
          return community;
        });
        console.log("Community bewerkt");
      }

    delete(communityId: string) {
        this.communityList = this.communityList.filter(community => community._id !== communityId);

        console.log("Community verwijderd");
    }
}