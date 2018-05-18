import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationQuestComponent } from './location-quest.component';

describe('LocationQuestComponent', () => {
  let component: LocationQuestComponent;
  let fixture: ComponentFixture<LocationQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
