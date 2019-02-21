import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetialsComponent } from './new-detials.component';

describe('NewDetialsComponent', () => {
  let component: NewDetialsComponent;
  let fixture: ComponentFixture<NewDetialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDetialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
