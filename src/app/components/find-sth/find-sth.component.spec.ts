import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSthComponent } from './find-sth.component';

describe('FindSthComponent', () => {
  let component: FindSthComponent;
  let fixture: ComponentFixture<FindSthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
