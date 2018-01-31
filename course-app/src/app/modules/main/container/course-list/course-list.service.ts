import { Injectable } from '@angular/core';

import { HttpEvent, HttpErrorResponse, HttpHandler, HttpRequest, HttpClient,
  HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';

import * as moment from 'moment';

import { Course, CourseShape } from '../../../../core/models/course.model';

const URL = 'http://localhost:3004/';
const courseRoute = 'courses';

@Injectable()
export class CourseListService {
  constructor(
    private http: HttpClient
  ) { }

  getCoursesList(data = {}): Observable<Course[]> {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key, data[key]);
    });

    // const fourteenDaysDiff = moment().subtract(14, 'days');

    return this.http.get<any[]>(`${URL}${courseRoute}`, { params: data })
      .map(response => {
        const result = response
          .map(({ id, name, isTopRated, date, endDate, description, length }) => {
            return new Course(id, name, isTopRated, date, endDate, description, length);
          });
          // .filter(el => {
          //   return moment(el.startDate) > fourteenDaysDiff;
          // });
         return result;
      });
  }

  getCourseById(id: number) {
    return this.getCoursesList().subscribe(
      courses => courses.filter(item => item.id === id)[0]
    );
  }

  addItemToCourseList(item: CourseShape): void {
    this.http.post(`${URL}${courseRoute}`, JSON.stringify(this.convertDataToBackendFormat(item)));
  }

  updateCourse(item: Course): void {
    this.http.put(`${URL}${courseRoute}/${item.id}`, JSON.stringify(this.convertDataToBackendFormat(item)));
  }

  deleteCourse(item: Course): Observable<any> {
    return this.http.delete(`${URL}${courseRoute}/${item.id}`);

  }

  clear(): void {
    // this.courses = [];
  }

  private convertDataToBackendFormat(item: Course): any {
    const obj = Object.assign({}, item, { start: item.startDate });
    delete obj.startDate;
    return obj;
  }
}
