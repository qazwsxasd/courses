import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoaderService {
  loader= new Subject<boolean>();

  display() {
    this.loader.next(true);
  }

  hide() {
    this.loader.next(false);
  }
}
