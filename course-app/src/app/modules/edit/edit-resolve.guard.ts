import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Course } from '../../core/models/course.model';
import { CourseListService } from '../../core/services/course-list.service';

@Injectable()
export class EditResolveGuard implements Resolve<Course> {
  constructor(
    private courseListService: CourseListService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    const id = +route.params['id'];
    return this.courseListService.getCourseById(id);
  }
}
