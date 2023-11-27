import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpOverviewComponent } from './pdp-overview.component';
import {UserService} from "../../../services/user.service";
import {ApplicationService} from "../../../services/application.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {User} from "../../../model/user.model";

describe('PdpOverviewComponent', () => {
  let component: PdpOverviewComponent;
  let userService: UserService;
  let applicationService: ApplicationService;
  let dialog: MatDialog;

  const mockUser: User = {
    id: 123,
    pdp: {
      id: 123,
      background: 'Some background text',
      present: 'Present text',
      future: 'Future text',
      futureRole: [{id: 1, name: 'Role Name', achievementDate: new Date('2023-11-27') }]
    },
    name: 'John Doe',
    email: 'john@example.com',
    jobRole: 'fesf',
    role: 'EMPLOYEE',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: { getUser: () => of({}) } },
        { provide: ApplicationService, useValue: { getApplicationByUser: () => of([]) } },
        { provide: MatDialog, useValue: {} },
      ],
    });
    userService = TestBed.inject(UserService);
    applicationService = TestBed.inject(ApplicationService);
    dialog = TestBed.inject(MatDialog);
    component = new PdpOverviewComponent(userService, applicationService, dialog);
  });

  it('should initialize component', () => {
    spyOn(component, 'getPdp');
    component.ngOnInit();
    expect(component.getPdp).toHaveBeenCalled();
  });

  it('should call getPdp and getApplicationByUser on getPdp', () => {
    spyOn(userService, 'getUser').and.returnValue(of(mockUser));
    spyOn(component, 'getApplicationByUser');
    component.getPdp();
    expect(userService.getUser).toHaveBeenCalled();
    expect(component.loggedInUser).toBeDefined();
    expect(component.getApplicationByUser).toHaveBeenCalled();
  });
});
