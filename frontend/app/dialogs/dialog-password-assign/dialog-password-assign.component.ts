import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../dialog-user-saved/dialog-user-saved.component';

@Component({
  selector: 'app-dialog-password-assign',
  templateUrl: './dialog-password-assign.component.html',
  styleUrls: ['./dialog-password-assign.component.scss']
})
export class DialogPasswordAssignComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogPasswordAssignComponent>
  ) { }

  ngOnInit() {
  }

  onOk() {
    this.dialogRef.close(false);
  }

}
