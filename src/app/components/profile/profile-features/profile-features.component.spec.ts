import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeaturesComponent } from './profile-features.component';

describe('ProfileFeaturesComponent', () => {
  let component: ProfileFeaturesComponent;
  let fixture: ComponentFixture<ProfileFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
