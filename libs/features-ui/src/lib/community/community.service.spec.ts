/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextEncoder = require("util").TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextDecoder = require("util").TextDecoder;

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from "../../../../../apps/riddet-app/src/environments/environment";

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Community } from '../community/community.model';

import { ConfigModule } from '@riddet-app/util-ui';
import { Types } from 'mongoose';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { CommunityService } from './community.service';

import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Category } from '../category/category.model';

describe('CommunitiesService', () => {
    let service: CommunityService;
    let httpMock: HttpTestingController;
    let dummyCommunities: Community[] = [];
    let fakeAuthServiceMock : any;

    beforeEach(waitForAsync(() => {
        dummyCommunities = [
            {
                _id: new Types.ObjectId("6391333037ceb01d296c5982"),
                name: "School community",
                description: "This is a community about school",
                creationDate: new Date(),
                imageUrl: "https://img.freepik.com/vrije-vector/grote-schoolgebouw-scene_1308-32058.jpg?w=2000",
                isPublic: true,
                categories: [] as Category[],
                threads: [] as Thread[],
                participants: [] as Types.ObjectId[],
                createdBy: new User()
            },
            {
                _id: new Types.ObjectId("63913b615640812705d69976"),
                name: "Gaming community",
                description: "This is a community about gaming",
                creationDate: new Date(),
                imageUrl: "https://image.coolblue.nl/624x351/content/1f3843a1d94bd73ff9de7c4d8a10c760",
                isPublic: true,
                categories: [] as Category[],
                threads: [] as Thread[],
                participants: [] as Types.ObjectId[],
                createdBy: new User()
            }
        ]

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ConfigModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
            ],
            providers: [
                CommunityService,
                {provide: AuthService, useValue: fakeAuthServiceMock}
            ]
        });

        service = TestBed.inject(CommunityService);
        httpMock = TestBed.inject(HttpTestingController);

        fakeAuthServiceMock = {
            getUserFromLocalStorage: jest.fn().mockReturnValue(of(new User())),
            getHttpOptions: jest.fn().mockReturnValue(of({ headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + 'token'})
              }))
        }
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should return communities when calling getCommunities', (done) => {
        service.getList('/communities').subscribe((communities) => {
            expect(communities.length).toBe(2);
            expect(communities.at(0)?._id).toEqual(dummyCommunities.at(0)?._id);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities');
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return no communities when calling getCommunities', (done) => {
        dummyCommunities = [];

        service.getList('/communities').subscribe((communities) => {
            expect(communities.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities');
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling getById', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        service.getById(dummyCommunities.at(0)!._id.toString()).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + dummyCommunities.at(0)!._id.toString());
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling getById', (done) => {
        dummyCommunities = [];

        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.getById(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + undefined);
        expect(req.request.method).toBe("GET");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling create', (done) => {
        service.create(dummyCommunities.at(0)!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling create', (done) => {
        dummyCommunities = [];

        service.create(dummyCommunities.at(0)!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling update', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.update(dummyCommunities.at(0)!, dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + dummyCommunities.at(0)?._id.toString());
        expect(req.request.method).toBe("PATCH");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling update', (done) => {
        dummyCommunities = [];
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.update(dummyCommunities.at(0)!, dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + undefined);
        expect(req.request.method).toBe("PATCH");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling delete', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.delete(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + dummyCommunities.at(0)?._id.toString());
        expect(req.request.method).toBe("DELETE");
        req.flush(dummyCommunities);
    });

    it('should return no community when calling delete', (done) => {
        dummyCommunities = [];

        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.delete(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + undefined);
        expect(req.request.method).toBe("DELETE");
        req.flush(dummyCommunities);
    });

   it('should return no community when calling join', (done) => {
        dummyCommunities = [];

        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.join(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(0);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + undefined + '/join');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });

    it('should return a community when calling leave', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        service.leave(dummyCommunities.at(0)?._id.toString()!).subscribe((community) => {
            const result = community as any;
            expect(result.length).toBe(2);

            done();
        });

        const req = httpMock.expectOne(environment.SERVER_API_URL + '/communities/' + dummyCommunities.at(0)?._id.toHexString() + '/leave');
        expect(req.request.method).toBe("POST");
        req.flush(dummyCommunities);
    });
});