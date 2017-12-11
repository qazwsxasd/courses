import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Course } from '../../../../core/models/course.model';
import { MOCK_DATA } from './mock_data';

// const courseListPromise = Promise.resolve(MOCK_DATA);

@Injectable()
export class CourseListService {
  courses: Course[] = MOCK_DATA;
  error: string;

  constructor() { }

//   fakeFetchCoursesList(): Promise<Course[]> {
//     return Promise.resolve(MOCK_DATA);
//   }

//   initCoursesList(): void {
//     this.fakeFetchCoursesList()
//         .then(data => this.courses = data)
//         .catch(this.handleError);
//   }


   getCoursesList(): Course[] {
    return this.courses;
  }

//   getCourseById(id: number) {
//     return this.fakeFetchCoursesList()
//       .then(data => data.filter(item => item.id === id)[0])
//       .catch(this.handleError);
//   }

  getCourseById(id: number) {
    return this.courses.filter(item => item.id === id)[0];
  }

  addItemToCourseList(item: Course): void {
    this.courses.push(new Course(
        item.id, 
        item.name, 
        item.startDate
    ));
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

//   private handleError(error: any): Promise<any> {
//     console.error('An error occurred', error);
//     return Promise.reject(error.message || error);
//   }
}
