import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchesDetailsComponent } from './launches-details.component';

describe('LaunchesDetailsComponent', () => {
  let component: LaunchesDetailsComponent;
  let fixture: ComponentFixture<LaunchesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
