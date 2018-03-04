import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';

import { AuthorConvertedShape } from '../../core/models/course.model';

const URL = 'http://localhost:3004/';
const authorsRoute = 'authors';

@Injectable()
export class AuthorsListService {
  constructor(
    private http: HttpClient
  ) { }

  getAuthorsList(): Observable<AuthorConvertedShape[]> {
    return this.http
      .get<any[]>(`${URL}${authorsRoute}`)
      .map(response => {
        const t: Array<AuthorConvertedShape> = [];
        response.map(item => {
          item.map(author => {
            t.push(Object.assign({}, { id: author.id, name: `${author.firstName} ${author.lastName}`, checked: false }));
          });
        });

        return t.filter((v, i, a) => a.indexOf(v) === i);
      });
  }
}
