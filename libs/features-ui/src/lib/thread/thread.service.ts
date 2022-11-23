
import { Injectable } from "@angular/core";
import { Thread } from "./thread.model";

@Injectable({providedIn: 'root',})
export class ThreadService {
     private thread? : Thread;
     private threadList: Thread[] = [
        
        {id: '1',
        title: "‘De nummerborden worden doorgebeld’: reconstructie van Zwarte Piet-geweld in Staphorst",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        publicationDate: new Date(),
        imageUrl: 'https://www.bungalowparkoverzicht.nl/wp-content/uploads/2013/08/zuid-limburg-2-250x250.jpg',
        externLink: 'https://www.google.com/',
        upvotes: 0,
        communityId: '1'}, 

        {id: '2',
        title: 'Evidence of cooking 780,000 years ago rewrites human history.',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        publicationDate: new Date(),
        imageUrl: '',
        externLink: 'https://www.google.com/',
        upvotes: 0,
        communityId: '2'},

        {id: '3',
        title: 'Opgelet!📣 Dinsdag 30 en woensdag 31 augustus stakingen NS 🚊',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        publicationDate: new Date(),
        imageUrl: 'https://www.techtastic.nl/wp-content/uploads/2015/04/ns-logo.png',
        externLink: 'https://www.google.com/',
        upvotes: 0,
        communityId: '3'}, 

        {id: '4',
        title: 'What frustates you in Angular',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        publicationDate: new Date(),
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
        externLink: 'https://www.google.com/',
        upvotes: 0,
        communityId: '4'}, 
        
        {id: '5',
        title: 'Welke sport doe je en wat kost het je?',
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        publicationDate: new Date(),
        imageUrl: 'https://www.fantasticsports.nl/wp-content/uploads/2021/06/Sportschool-Hoogeveen-Fitness-Fantastic-Sports-74-250x250.jpg',
        externLink: 'https://www.google.com/',
        upvotes: 0,
        communityId: '5'}
    ];

    getList(): Thread[] {
        return this.threadList;
    }

    getById(threadId: string):  Thread {
        return this.threadList.filter(thread => thread.id === threadId)[0];
    }

    getByCommunityId(communityId: string):  Thread[] {
        return this.threadList.filter(thread => thread.communityId === communityId);
    }

    create(thread: Thread): void {
        this.thread = { ...thread };

        this.thread.id = (Math.trunc(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1).toString();

        this.thread.publicationDate = new Date();

        this.threadList.push(this.thread);

        console.log("Thread aangemaakt");
      }
    
      update(updatedThread?: Thread): void {
        const thread = this.threadList.filter(thread => thread.id === updatedThread?.id)[0];
        const index = this.threadList.indexOf(thread);
        this.threadList[index] = {...thread, ...updatedThread};

        console.log("Thread bewerkt");
      }

    delete(threadId: string) : void {
        this.threadList = this.threadList.filter(thread => thread.id !== threadId);
        
        console.log("Thread verwijderd");
    }
}