import { Component, OnInit } from '@angular/core';
import {Role} from "../../../model/role.model";
import {RoleService} from "../../../services/role.service";
import {MatDialog} from "@angular/material/dialog";
import {AddRoleModalComponent} from "../add-role-modal/add-role-modal.component";
import {DeleteRoleModalComponent} from "../delete-role-modal/delete-role-modal.component";

@Component({
  selector: 'app-roles-overview',
  templateUrl: './roles-overview.component.html',
  styleUrls: ['./roles-overview.component.css']
})
export class RolesOverviewComponent implements OnInit {
  roles: Role[] = [];
  constructor(
    public dialog: MatDialog,
    private roleService: RoleService

  ) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe({
        next: roles => {
          this.roles = roles;
          this.sortRolesByName();
        },
      });
  }

  addRole = () => {
    const dialogRefAddRoleModal = this.dialog.open(AddRoleModalComponent, {autoFocus: false});

    dialogRefAddRoleModal.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getRoles();
      }
    });
  }

  deleteRoleModal = (role: Role) => {
    const dialogRefDeleteRoleModal = this.dialog.open(DeleteRoleModalComponent, {data: role, autoFocus: false});

    dialogRefDeleteRoleModal.afterClosed().subscribe(result => {
      if (result === 'A') {
        this.getRoles();
      }
    });
  }

  sortRolesByName(): void {
    this.roles.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
