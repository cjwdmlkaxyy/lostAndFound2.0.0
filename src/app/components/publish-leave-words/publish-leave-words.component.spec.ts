import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishLeaveWordsComponent } from './publish-leave-words.component';

describe('PublishLeaveWordsComponent', () => {
  let component: PublishLeaveWordsComponent;
  let fixture: ComponentFixture<PublishLeaveWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishLeaveWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishLeaveWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
