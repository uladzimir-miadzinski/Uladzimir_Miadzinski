import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../dialog-user-saved/dialog-user-saved.component';

@Component({
  selector: 'app-dialog-password-assigned',
  templateUrl: './dialog-password-assigned.component.html',
  styleUrls: ['./dialog-password-assigned.component.scss']
})
export class DialogPasswordAssignedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogPasswordAssignedComponent>
  ) { }

  ngOnInit() {
  }

  onOk() {
    this.dialogRef.close(false);
  }

}
