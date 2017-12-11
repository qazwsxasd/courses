import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from './matDialog.component';

@Injectable()
export class MatDialogService {
    constructor(private dialog: MatDialog) {}

    show({ title, message, icon } = { title: '', message: '', icon: ''}): Observable<boolean> {
        let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        dialogRef = this.dialog.open(ConfirmDialogComponent);
        Object.assign(dialogRef.componentInstance, {
            title,
            message,
            icon
        })

        return dialogRef.afterClosed();
    }
}