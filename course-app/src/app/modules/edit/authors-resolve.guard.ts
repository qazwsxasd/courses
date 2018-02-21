import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthorsListService} from './edit.service';

@Injectable()
export class AuthorResolveGuard implements Resolve<any[]> {
  constructor(
    private authorsListService: AuthorsListService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    return this.authorsListService.getAuthorsList();
  }
}
