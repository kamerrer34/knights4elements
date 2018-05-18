import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIncreaseComponent } from './profile-increase.component';

describe('ProfileIncreaseComponent', () => {
  let component: ProfileIncreaseComponent;
  let fixture: ComponentFixture<ProfileIncreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileIncreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
