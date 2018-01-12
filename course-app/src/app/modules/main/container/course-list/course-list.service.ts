import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';

import * as moment from 'moment';

import { Course, CourseShape } from '../../../../core/models/course.model';
import { MOCK_DATA } from './mock_data';


@Injectable()
export class CourseListService {
  courses: any[] = MOCK_DATA;
  error: string;

  constructor() { }

  getCoursesList(): Observable<Course[]> {
    // const fourteenDaysDiff = moment().subtract(14, 'days');
    // of(MOCK_DATA as any[])
    //   .map(response => response.map(({id, name, rate, start, endDate, description, duration}) => {
    //     return new Course(id, name, rate, start, endDate, description, duration);
    //   }))
    //   .map(item => item.filter(el => moment(el.startDate) > fourteenDaysDiff))
    //   .subscribe(courses => this.courses = courses);
    // return of(this.courses);

    const fourteenDaysDiff = moment().subtract(14, 'days');

    return from(MOCK_DATA as any[])
      .map(({ id, name, rate, start, endDate, description, duration }) => new Course(id, name, rate, start, endDate, description, duration))
      .filter(item => moment(item.startDate) > fourteenDaysDiff)
      // .map(item => of(item))
      // .mergeAll()
      .toArray()
      .map(res => this.courses = res);

  }

  getCourseById(id: number) {
    return this.getCoursesList().subscribe(
      courses => courses.filter(item => item.id === id)[0]
    );
  }

  addItemToCourseList(item: CourseShape): void {
    const obj = Object.assign({}, item, { start: item.startDate });
    delete obj.startDate;
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
