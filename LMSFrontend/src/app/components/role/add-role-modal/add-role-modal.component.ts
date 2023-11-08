import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.css']
})
export class AddRoleModalComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    private rolService: RoleService,
    private dialogRef: MatDialogRef<AddRoleModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }

  addRole = (button: string) => {
    this.rolService.postRole(this.signupForm.value).subscribe((msg) => {
      if (button === 'A'){
        this.dialogRef.close(button)
      }
    })
  }
}
