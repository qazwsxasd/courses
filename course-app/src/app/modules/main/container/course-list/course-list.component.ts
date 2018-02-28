import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';

import { Store } from '@ngrx/store';
import { COURSES_GET } from '../../../../redux/reducer/courses.reducer';

import { CourseListService } from '../../../../core/services/course-list.service';
import { MatDialogService } from '../../../../core/dialogs/matDialog.service';

import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courseList: Course[];
  filteredList: Observable<Course[]>;
  filterField: string;
  private queryText: string;
  isAsc: boolean;
  private chunkedCourses: Course[];
  private currentPage = 0;
  private limit = 3;

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.chunkedCourses = [];
    this.filterField = 'startDate';
    // this.filteredList = this.courseListService.getCoursesList();
    this.filteredList = Observable.of([]);
    this.appendMoreCourses();
  }

  deletedCourse(item: Course): void {
    this.matDialogService.show({
      title: 'Delete Action:',
      message: 'Do you really want to delete this course? ',
      icon: ''
    })
    .filter(confirmed => confirmed)
    .switchMap(() => this.courseListService.deleteCourse(item))
    .switchMap(() => this.courseListService.getCoursesList({
      start: 0,
      count: this.currentPage  - this.limit // Math.floor(this.currentPage / this.limit) + this.limit
    }))
    .subscribe(res => {
      this.filteredList = Observable.of(res);
    });

  }

  handleFilter(s = ''): void {
    this.queryText = s.toLowerCase();
    this.courseListService.getCoursesList({
      start: 0,
      count: this.currentPage,
      query: this.queryText
    })
    .subscribe(res => {
      this.filteredList = Observable.of(res);
    });
  }

  appendMoreCourses(start = this.currentPage, count = this.limit, query = this.queryText || '') {
    this.filteredList = Observable
      .forkJoin(
        this.filteredList,
        this.courseListService.getCoursesList({
          start,
          count,
          query
        })
      )
      .map(([res1, res2]) => [...res1, ...res2])
      .do(() => {
        this.currentPage += this.limit;
      });
  }
}
