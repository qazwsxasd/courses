import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './matDialog.component.html',
  styleUrls: ['./matDialog.component.scss']
})
export class ConfirmDialogComponent {
    public title: string;
    public message: string;
    public icon: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}
