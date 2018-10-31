import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-login-err',
  templateUrl: './dialog-login-err.component.html',
  styleUrls: ['./dialog-login-err.component.scss']
})
export class DialogLoginErrComponent implements OnInit, AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLoginErrComponent>,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }

  onOk() {
    this.dialogRef.close(false);
  }
}
