import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListDetailsModalComponent } from './action-list-details-modal.component';

describe('ActionListDetailsModalComponent', () => {
  let component: ActionListDetailsModalComponent;
  let fixture: ComponentFixture<ActionListDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionListDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionListDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
