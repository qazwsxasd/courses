import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ICourse } from '../models/course.model';

const CORSES_LIST = [
  {
    name: 'name1',
    description: 'description1',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    name: 'name2',
    description: 'description2',
    startDate: new Date(),
    endDate: new Date(),
  }
];

@Injectable()
export class FetchService {

  constructor() { }

  getCoursesList(): Observable<ICourse[]> {
    return of(CORSES_LIST);
  }
}
