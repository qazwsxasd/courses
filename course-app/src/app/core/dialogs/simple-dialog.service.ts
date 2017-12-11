// TODO refactor)
import { Injectable } from '@angular/core';

@Injectable()
export class SimpleDialogService {
  confirm(message?: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(window.confirm(message || 'Is it OK?'));
    });
  };
}