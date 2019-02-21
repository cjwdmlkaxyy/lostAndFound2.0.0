import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNewsComponent } from './publish-news.component';

describe('PublishNewsComponent', () => {
  let component: PublishNewsComponent;
  let fixture: ComponentFixture<PublishNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
