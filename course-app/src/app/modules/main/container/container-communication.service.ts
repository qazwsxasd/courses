import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContainerCommunicationService {
  private channel = new Subject<string>();
  public channel$ = this.channel.asObservable();

  setSearchField(data: string) {
    this.channel.next(data);
  }
}
