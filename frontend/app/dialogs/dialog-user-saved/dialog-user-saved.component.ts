import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  success: boolean;
  error?: HttpErrorResponse | string;
}

@Component({
  selector: 'app-dialog-user-saved',
  templateUrl: './dialog-user-saved.component.html',
  styleUrls: ['./dialog-user-saved.component.scss']
})
export class DialogUserSavedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogUserSavedComponent>
  ) {
  }

  ngOnInit() {
  }

  onOk() {
    this.dialogRef.close(false);
  }
}
