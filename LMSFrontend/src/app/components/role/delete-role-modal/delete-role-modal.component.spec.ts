import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleModalComponent } from './delete-role-modal.component';

describe('DeleteRoleModalComponent', () => {
  let component: DeleteRoleModalComponent;
  let fixture: ComponentFixture<DeleteRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
