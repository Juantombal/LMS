import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user.model";
import {PdpService} from "../../../services/pdp.service";
import {Role} from "../../../model/role.model";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-edit-pdp-modal',
  templateUrl: './edit-pdp-modal.component.html',
  styleUrls: ['./edit-pdp-modal.component.css']
})
export class EditPdpModalComponent implements OnInit {
  signupForm: FormGroup
  signupFormFutureroles: FormGroup
  roles: Role[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private pdpService: PdpService,
    private dialogRef: MatDialogRef<EditPdpModalComponent>,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.signupFormFutureroles = this.createFormGroupFutureRoles()
    this.signupForm.patchValue(this.data.pdp)
    this.getRoles()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      background: new FormControl('', [Validators.required, Validators.minLength(1)]),
      present: new FormControl('', [Validators.required, Validators.minLength(1)]),
      future: new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  createFormGroupFutureRoles = (): FormGroup => {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      achievementDate: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
  }

  createFutureRoles = (pdpId:number) => {
    this.pdpService.postFutureRole(pdpId, this.signupFormFutureroles.value).subscribe((msg) => {
      this.refreshFutureRoles();
    })
  }

  DeleteFutureRole = (id: number) => {
    this.pdpService.deleteFutureRole(id).subscribe((msg) => {
      this.refreshFutureRoles();
    })
  }

  editPdp = (id: number, button: string) => {
    this.pdpService.updatePdp(id, this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
      },
    });
  }

  refreshFutureRoles(): void {
    this.pdpService.getFutureRolesByPdpId(this.data.pdp.id).subscribe((futureRoles) => {
      this.data.pdp.futureRole = futureRoles;
    });
  }
}
