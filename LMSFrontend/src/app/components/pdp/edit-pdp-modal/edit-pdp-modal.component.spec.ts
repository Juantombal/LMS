import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPdpModalComponent } from './edit-pdp-modal.component';

describe('EditPdpModalComponent', () => {
  let component: EditPdpModalComponent;
  let fixture: ComponentFixture<EditPdpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPdpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPdpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
