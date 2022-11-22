import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadListComponent } from './thread-list.component';

describe('ThreadCommunityListComponent', () => {
  let component: ThreadListComponent;
  let fixture: ComponentFixture<ThreadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreadListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
