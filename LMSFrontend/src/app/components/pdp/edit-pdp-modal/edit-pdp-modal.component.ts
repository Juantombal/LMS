import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user.model";
import {PdpService} from "../../../services/pdp.service";

@Component({
  selector: 'app-edit-pdp-modal',
  templateUrl: './edit-pdp-modal.component.html',
  styleUrls: ['./edit-pdp-modal.component.css']
})
export class EditPdpModalComponent implements OnInit {
  signupForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private pdpService: PdpService,
    private dialogRef: MatDialogRef<EditPdpModalComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
    this.signupForm.patchValue(this.data.pdp)
  }

  createFormGroup = (): FormGroup => {
    return new FormGroup({
      background: new FormControl('', [Validators.required, Validators.minLength(1)]),
      present: new FormControl('', [Validators.required, Validators.minLength(1)]),
      future: new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  editPdp = (id: number, button: string) => {
    this.pdpService.updatePdp(id, this.signupForm.value).subscribe((msg) => {
      this.dialogRef.close(button)
    })
  }
}
