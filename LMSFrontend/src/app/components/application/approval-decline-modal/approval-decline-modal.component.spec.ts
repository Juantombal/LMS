import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDeclineModalComponent } from './approval-decline-modal.component';

describe('ApprovalDeclineModalComponent', () => {
  let component: ApprovalDeclineModalComponent;
  let fixture: ComponentFixture<ApprovalDeclineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalDeclineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDeclineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
