import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../../services/role.service";
import {Role} from "../../../model/role.model";

@Component({
  selector: 'app-delete-role-modal',
  templateUrl: './delete-role-modal.component.html',
  styleUrls: ['./delete-role-modal.component.css']
})
export class DeleteRoleModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<DeleteRoleModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  deleteRole = (id: number, button: string) => {
    this.roleService.deleteRole(id).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
