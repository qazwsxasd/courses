import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

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

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
  ) { }

  ngOnInit() {
    this.filterField = 'startDate';
    this.filteredList = this.courseListService.getCoursesList();
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
        this.filteredList = this.courseListService.getCoursesList();
      });
    });
  }

  handleFilter(s: string): void {
    this.queryText = s;
  }
}
