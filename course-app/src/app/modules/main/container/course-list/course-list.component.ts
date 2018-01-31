import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

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
  private chunked: Course[];
  private currentPage = 1;
  private limit = 3;

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
  ) { }

  ngOnInit() {
    this.chunked = [];
    this.filterField = 'startDate';
    // this.filteredList = this.courseListService.getCoursesList();
    this.appendData();
  }

  deletedCourse(item: Course): void {
    this.matDialogService.show({
      title: 'Delete Action:',
      message: 'Do you really want to delete this course? ',
      icon: ''
    })
    .filter(confirmed => confirmed)
    .subscribe(() => {
      this.courseListService.deleteCourse(item).subscribe(() => {
        this.filteredList = this.courseListService.getCoursesList({
          start: 1,
          count: this.currentPage - 1 // Math.floor(this.currentPage / this.limit) + this.limit
        });
      });
    });
  }

  handleFilter(s: string): void {
    this.queryText = s;
  }

  appendData() {
    this.courseListService
      .getCoursesList({
        start: this.currentPage,
        count: this.limit
      })
      .subscribe(res => {
          this.chunked.push(...res);
          this.currentPage += this.limit;
          console.log(this.chunked);
          this.filteredList = Observable.of(this.chunked);
      });
  }
}
