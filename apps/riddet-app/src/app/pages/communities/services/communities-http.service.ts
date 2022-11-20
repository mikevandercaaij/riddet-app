
import { Injectable } from "@angular/core";
import { Community } from "@riddet-app/data";
import { Observable, of } from "rxjs";
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

    getList(): Observable<Community[]> {
        return of(this.communityList);
      }

    getById(communityId: string):  Observable<Community> {
        return of(this.communityList.filter(community => community._id === communityId)[0]);
    }

    create(community: Community): Observable<any> {
        this.community = { ...community };

        this.community._id = uuidv4();
        this.community.creationDate = new Date();
        this.community.imageUrl = "https://cdn.dribbble.com/users/5745266/screenshots/13977782/media/1bd8a00b559752b86996197fcd7645dd.png?compress=1&resize=400x300&vertical=top";
        this.community.isPublic = true;

        this.communityList.push(this.community);

        console.log("Community aangemaakt");

        return of({
          status: 201,
          message: 'success',
        });
      }
    
      update(community?: Community): Observable<any> {
        // TO DO: movieList updaten
        
        return of({
          status: 201,
          message: 'success',
        });
      }

    delete(communityId: string) {
        this.communityList = this.communityList.filter(community => community._id !== communityId);

        console.log("Community verwijderd");

        return of({
            status: 201,
            message: 'success',
          });
    }
}