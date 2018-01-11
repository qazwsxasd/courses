import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import * as moment from 'moment';

import { Course, CourseShape } from '../../../../core/models/course.model';
import { MOCK_DATA } from './mock_data';


@Injectable()
export class CourseListService {
  courses: any[] = MOCK_DATA;
  error: string;

  constructor() { }

  getCoursesList(): Observable<Course[]> {
    return of(this.courses)
      .map(response => {
        // const courses: Course[] = response as Course[];
        response.map(item => {
          const result = Object.assign(item, { startDate: item.start });
          delete result.start;
          return result;
        });
        return response;
        // return response.filter(item => moment(item.startDate) > moment().subtract(14, 'days'));
      })
      // .filter(item => item => moment(item.startDate) > moment().subtract(14, 'days'))
      // .map(items => items.filter(item => moment(item.startDate) > moment().subtract(14, 'days')));
  }

  getCourseById(id: number) {
    return this.getCoursesList().subscribe(
      courses => courses.filter(item => item.id === id)[0]
    );
  }

  addItemToCourseList(item: CourseShape): void {
    const obj = Object.assign({}, item, { start: item.startDate });
    delete obj.startDate; // ?
    this.courses.push(obj);
  }

  updateCourse(item: Course): void {
    this.courses.map(course => {
        if (course.id === item.id) {
            Object.assign(course, item);
        }
    });
  }

  deleteCourse(item: Course): void {
    let index = -1;
    const finded = this.courses.find(value => value.id === item.id);
    if (finded) {
      index = this.courses.indexOf(finded);
    }
    if (index > -1) {
      this.courses.splice(index, 1);
    }
  }

  clear(): void {
    this.courses = [];
  }
}
