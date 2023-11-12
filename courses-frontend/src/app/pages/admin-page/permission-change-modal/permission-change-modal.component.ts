import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import Role from "../../../data-access/role/role.enum";
import { roles } from "../../../data-access/role/role.enum";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-permission-change-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './permission-change-modal.component.html',
  styles: [`
    .actions {
      margin-top: -20px !important;
    }
  `]
})
export class PermissionChangeModalComponent {
  role: Role = this.data.currentRole;
  readonly roles = roles;
  constructor(
    public dialogRef: MatDialogRef<PermissionChangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentRole: Role }
  ) {}
  cancel() {
    this.dialogRef.close();
  }
  changeRole() {
    if (this.data.currentRole !==  this.role)
      this.dialogRef.close(this.role);
    else
      this.dialogRef.close();
  }
}
