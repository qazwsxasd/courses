import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { CourseListService } from './course-list.service';
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
  ) { }

  ngOnInit() {
    this.chunkedCourses = [];
    this.filterField = 'startDate';
    // this.filteredList = this.courseListService.getCoursesList();
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
    .subscribe(() => {
      this.filteredList = this.courseListService.getCoursesList({
        start: 0,
        count: this.currentPage // Math.floor(this.currentPage / this.limit) + this.limit
      });
    });

  }

  handleFilter(s = ''): void {
    this.queryText = s.toLowerCase();
    this.courseListService.getCoursesList({
      start: 0,
      count: this.currentPage,
      query: s
    })
    .subscribe(res => {
      this.chunkedCourses = res;
      this.filteredList = Observable.of(this.chunkedCourses);
    });
  }

  appendMoreCourses(start = this.currentPage, count = this.limit, query = this.queryText || '') {
    this.courseListService
      .getCoursesList({
        start,
        count,
        query
      })
      .subscribe(res => {
          this.chunkedCourses.push(...res);
          this.currentPage += this.limit;
          console.log(this.chunkedCourses);
          this.filteredList = Observable.of(this.chunkedCourses);
      });
  }
}
