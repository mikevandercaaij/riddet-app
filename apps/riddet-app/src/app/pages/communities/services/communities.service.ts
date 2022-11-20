
import { Injectable } from "@angular/core";
import { Community } from "@riddet-app/data";
import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root',})
export class CommunitiesHttpService {
     private community? : Community;
     private communityList: Community[] = [
        {
            "_id": uuidv4(),
            "name": "thenetherlands",
            "description": "Welcome to the largest bilingual Reddit community for sharing anything related to the Netherlands: news, sports, humor, culture and questions. Please browse our FAQ before posting!",
            "creationDate": new Date(),
            "imageUrl": "https://i1.sndcdn.com/artworks-4DtpzBOYbUV5lYUb-nBD1hw-t500x500.jpg",
            "isPublic": true
        },
        {
            "_id": uuidv4(),
            "name": "news",
            "description": "The place for news articles about current events in the United States and the rest of the world. Discuss it all here.",
            "creationDate": new Date(),
            "imageUrl": "https://www.baseclear.com/wp-content/uploads/shutterstock_283615094-Medium-500x500.jpg",
            "isPublic": true
        },
        {
          "_id": uuidv4(),
          "name": "Avans",
          "description": "Avans Hogeschool is in 2004 ontstaan door een fusie tussen Hogeschool Brabant en Hogeschool ’s-Hertogenbosch. Deze kennisinstituten werkten toen al nauw samen onder één College van Bestuur.",
          "creationDate": new Date(),
          "imageUrl": "https://tools.avans.nl/tools/image/7c4dZ6JYln.png",
          "isPublic": true
      },

      {
        "_id": uuidv4(),
        "name": "programming",
        "description": "The community for coders and programmers! Discuss programming, share your knowledge, and learn from others.",
        "creationDate": new Date(),
        "imageUrl": "https://www.cognizantsoftvision.com/wp-content/uploads/2018/12/coding-500x500.jpg",
        "isPublic": true
    },
    {
      "_id": uuidv4(),
      "name": "fitness",
      "description": "A place for the pursuit of physical fitness goals. Please see [the r/Fitness Wiki and FAQ](https://thefitness.wiki) for help with common questions.",
      "creationDate": new Date(),
      "imageUrl": "https://lmimirror3pvr.azureedge.net/static/media/14405/9358507e-70de-49fe-86b0-d81f0b36c90f/q4-be-limitless-program-500x500-mb-bp.jpg",
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

        console.log(this.communityList.length);
        console.log("Community aangemaakt");
      }
    
      update(updatedCommunity?: Community): void {
        const community = this.communityList.filter(community => community._id === updatedCommunity?._id)[0];
        const index = this.communityList.indexOf(community);
        this.communityList[index] = {...community, ...updatedCommunity};

        console.log("Community bewerkt");
      }

    delete(communityId: string) {
        this.communityList = this.communityList.filter(community => community._id !== communityId);

        console.log("Community verwijderd");
    }
}