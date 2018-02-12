import { Injectable } from '@angular/core';

import { HttpEvent, HttpErrorResponse, HttpHandler, HttpRequest, HttpClient,
  HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';


const URL = 'http://localhost:3004/';
const authorsRoute = 'authors';

@Injectable()
export class AuthorsListService {
  constructor(
    private http: HttpClient
  ) { }

  getAuthorsList(): Observable<any[]> {
    return this.http
      .get<any[]>(`${URL}${authorsRoute}`)
      .map(response => {
        const t: Array<{ name: string, checked: boolean}> = [];
        response.map(item => {
          item.map(author => {
            t.push(Object.assign({},{ name: `${author.firstName} ${author.lastName}`, checked: false }));
          });
        });

        return t.filter((v, i, a) => a.indexOf(v) === i);
      });
  }
}
