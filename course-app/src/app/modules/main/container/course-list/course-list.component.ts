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
import { COURSES_LIST, COURSES_FILTER } from '../../../../redux/reducer/courses.reducer';

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
  filteredList1: Course[];
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
    this.store.select(state => state.courses)
      .subscribe(res => {
        console.log(res);
        this.filteredList1 = res;
      });
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
      this.store.dispatch({ type: COURSES_FILTER, payload: res });
    });
  }

  appendMoreCourses(start = this.currentPage, count = this.limit, query = this.queryText || '') {
    this.courseListService.getCoursesList({
      start,
      count,
      query
    })
    .subscribe((res) => {
      this.store.dispatch({ type: COURSES_LIST, payload: res });
      this.currentPage += this.limit;
    });
  }
}
