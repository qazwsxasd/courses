import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

import { CourseListService } from './course-list.service';
import { MatDialogService } from '../../../../core/dialogs/matDialog.service';

import { FilterSearchPipe } from '../../../../shared/pipes/filter-search.pipe';

import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterSearchPipe]
})
export class CourseListComponent implements OnInit, OnDestroy {
  courseList: Course[];
  filteredList: Observable<Course[]>;
  filterField: string;
  isAsc: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
    private filterSearchPipe: FilterSearchPipe
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
    .subscribe(confirmed => this.courseListService.deleteCourse(item));
  }

  handleFilter(courseList, s: string): void {
    this.filteredList = this.filterSearchPipe.transform(courseList, s);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
