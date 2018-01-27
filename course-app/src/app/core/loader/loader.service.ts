import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoaderService {
  loader= new Subject<boolean>();

  display() {
    console.log('loader true');
    this.loader.next(true);
  }

  hide() {
    console.log('loader false');
    this.loader.next(false);
  }
}
