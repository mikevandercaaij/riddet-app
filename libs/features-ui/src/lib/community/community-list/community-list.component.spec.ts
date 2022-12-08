/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable prefer-const */
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextEncoder = require('util').TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextDecoder = require('util').TextDecoder;


import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Types } from 'mongoose';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Category } from '../../category/category.model';
import { Thread } from '../../thread/thread.model';
import { User } from '../../user/user.model';
import { CommunityService } from '../community.service';
import { CommunityListComponent } from './community-list.component';

const dummyCommunities = [
  {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    name: 'School community',
    description: 'This is a community about school',
    creationDate: new Date(),
    imageUrl:
      'https://img.freepik.com/vrije-vector/grote-schoolgebouw-scene_1308-32058.jpg?w=2000',
    isPublic: true,
    categories: [] as Category[],
    threads: [] as Thread[],
    participants: [] as Types.ObjectId[],
    createdBy: new User(),
  },
  {
    _id: new Types.ObjectId('63913b615640812705d69976'),
    name: 'Gaming community',
    description: 'This is a community about gaming',
    creationDate: new Date(),
    imageUrl:
      'https://image.coolblue.nl/624x351/content/1f3843a1d94bd73ff9de7c4d8a10c760',
    isPublic: true,
    categories: [] as Category[],
    threads: [] as Thread[],
    participants: [] as Types.ObjectId[],
    createdBy: new User(),
  },
];

describe('CommunityListComponent', () => {
  let component: CommunityListComponent;
  let fixture: ComponentFixture<CommunityListComponent>;
  let activatedRouteSpy;
  let fakeAuthServiceMock: any;
  let fakeCommunityServiceMock: any;

  beforeEach(waitForAsync(() => {
    activatedRouteSpy = {
      snapshot: {
        data: convertToParamMap({
          overViewType: 'overviewType',
        }),
      },
    };

    fakeCommunityServiceMock = {
      getList: jest.fn().mockReturnValue(of(dummyCommunities)),
    };

    fakeAuthServiceMock = {
      getUserFromLocalStorage: jest.fn().mockReturnValue(of(new User())),
      getHttpOptions: jest.fn().mockReturnValue(
        of({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + 'token',
          }),
        })
      ),
      currentUser$: new BehaviorSubject<User | undefined>(undefined),
    };

    TestBed.configureTestingModule({
      declarations: [CommunityListComponent],
      providers: [
        { provide: CommunityService, useValue: fakeCommunityServiceMock },
        HttpClientTestingModule,
        HttpClient,
        HttpHandler,
        HttpTestingController,
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: AuthService, useValue: fakeAuthServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CommunityListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get a list of all communities', () => {
    component.type = 'all';
    component.ngOnInit();
    const result = component.communities
    expect(result?.length).toBe(2);
  });

  it('should get a list of all communities user has created', () => {
    component.type = 'created';
    component.ngOnInit();
    const result = component.communities
    expect(result?.length).toBe(2);
  });

  it('should get a list of all joined communities', () => {
    component.type = 'joined';
    component.ngOnInit();
    const result = component.communities
    expect(result?.length).toBe(2);
  });

  it('should call current user', () => {
    component.ngOnInit()
    expect(fakeAuthServiceMock.currentUser$).toBeTruthy()
  });
});
