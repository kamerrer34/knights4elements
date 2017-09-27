import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossesComponent } from './bosses.component';

describe('BossesComponent', () => {
  let component: BossesComponent;
  let fixture: ComponentFixture<BossesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
