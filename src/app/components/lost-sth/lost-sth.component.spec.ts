import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostSthComponent } from './lost-sth.component';

describe('LostSthComponent', () => {
  let component: LostSthComponent;
  let fixture: ComponentFixture<LostSthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostSthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostSthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
