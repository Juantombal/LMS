import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsModalComponent } from './application-details-modal.component';

describe('ApplicationDetailsModalComponent', () => {
  let component: ApplicationDetailsModalComponent;
  let fixture: ComponentFixture<ApplicationDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});