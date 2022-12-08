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
import { FormControl } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Types } from 'mongoose';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';
import { Thread } from '../../thread/thread.model';
import { User } from '../../user/user.model';
import { CommunityService } from '../community.service';
import { CommunityEditComponent } from './community-edit.component';

const dummyCommunity = 
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
  };

  const dummyCategories = [
    {
        _id: "6390d1cc295f50e74c8fd45c",
        name: "Education",
    },
    {
        _id: "6390d201295f50e74c8fd460",
        name: "Fashion",
    },
    {
        _id: "6390d20d295f50e74c8fd464",
        name: "Food",
    }
  ]


describe('CommunityEditComponent', () => {
  let component: CommunityEditComponent;
  let fixture: ComponentFixture<CommunityEditComponent>;
  let activatedRouteSpy;
  let type: boolean;
  let fakeAuthServiceMock: any;
  let fakeCommunityServiceMock: any;
  let fakeCategoryServiceMock: any;

  beforeEach(waitForAsync(() => {
    activatedRouteSpy = {
      snapshot: {
        data: convertToParamMap({
          editMode: type,
        }),
      },
    };

    fakeCommunityServiceMock = {
      getById: jest.fn().mockReturnValue(of(dummyCommunity)),
    };

    fakeCategoryServiceMock = {
        getAll: jest.fn().mockReturnValue(of(dummyCategories)),
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
      declarations: [CommunityEditComponent],
      providers: [
        { provide: CommunityService, useValue: fakeCommunityServiceMock },
        HttpClientTestingModule,
        HttpHandler,
        HttpClient,
        HttpTestingController,
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: AuthService, useValue: fakeAuthServiceMock },
        { provide: CategoryService, useValue: fakeCategoryServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CommunityEditComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check for valid url input in the form | success', () => {
    component.editMode = true

    const result = component.validImageUrl(new FormControl("https://angular.io/api/forms/FormControl"))
    expect(result).toBe(null);
  });

  it('should check for valid url input in the form | success', () => {
    component.editMode = true

    const result = component.validImageUrl(new FormControl("https://angular.io/api/forms/FormControl"))
    expect(result).toBe(null);
});

  it('should check for valid url input in the form | fail', () => {

    expect(true).toBeTruthy();

    const result = component.validImageUrl(new FormControl("invalidUrl"))
    expect(result).toStrictEqual({imageUrl : false});
  });

  it('should check for name input in form | success', () => {
    component.editMode = true

    const result = component.validName(new FormControl("success (min 5 characters)"))
    expect(result).toBe(null);

});

  it('should check for name input in form | fail', () => {

    expect(true).toBeTruthy();

    const result = component.validName(new FormControl("fail"))
    expect(result).toStrictEqual({name : false});
  });

  it('should check for description input in form | success', () => {
    component.editMode = true

    const result = component.validDescription(new FormControl("I'm a good description, because I contain more than 10 characters."))
    expect(result).toBe(null);

});

  it('should check for description input in the form | fail', () => {

    expect(true).toBeTruthy();

    const result = component.validDescription(new FormControl("fail"))
    expect(result).toStrictEqual({description : false});
  });
});
