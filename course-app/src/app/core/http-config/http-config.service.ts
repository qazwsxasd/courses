import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class HttpConfigService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.display();

    const updateReq = req.clone({
      // TODO auth
      setHeaders: { 'Content-Type': 'application/json' }
    });

    return next
      .handle(updateReq)
      .catch(err => {
        this.loaderService.hide();
        return Observable.throw(err);
      })
      .do(
        (ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            this.loaderService.hide();
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.loaderService.hide();
          }
        }
       );

  }
}
