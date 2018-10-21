import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-login-err',
  templateUrl: './dialog-login-err.component.html',
  styleUrls: ['./dialog-login-err.component.scss']
})
export class DialogLoginErrComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLoginErrComponent>
  ) { }

  ngOnInit() {
  }

  onOk() {
    this.dialogRef.close(false);
  }
}
