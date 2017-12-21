import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

import { CourseListService } from './course-list.service';
import { MatDialogService } from '../../../../core/dialogs/matDialog.service';

import { FilterSearchPipe } from './filter-search.pipe';

import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterSearchPipe]
})
export class CourseListComponent implements OnInit {
  courseList: Course[];
  filteredList: Course[];
  filterField: string;
  isAsc: boolean;

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
    private filterSearchPipe: FilterSearchPipe,
  ) { }

  ngOnInit() {
    this.filterField = 'startDate';
    this.courseListService.getCoursesList().subscribe(courses => {
      this.courseList = courses;
      this.filteredList = courses;
    });
  }

  deletedCourse(item: Course): void {
    this.matDialogService.show({
      title: 'Delete Action:',
      message: 'Do you really want to delete this course? ',
      icon: ''
    })
    .filter(confirmed => confirmed)
    .subscribe(confirmed => this.courseListService.deleteCourse(item));
  }

  handleFilter(s: string): void {
    this.filteredList = this.filterSearchPipe.transform(this.courseList, s);
  }
}
