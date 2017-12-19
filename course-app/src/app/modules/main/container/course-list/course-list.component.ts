import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CourseListService } from './course-list.service';
import { MatDialogService } from '../../../../core/dialogs/matDialog.service';
import { ContainerCommunicationService } from '../container-communication.service';

import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courseList: Course[];
  filterField: string;
  isAsc: boolean;
  sub: Subscription;
  search: string;

  constructor(
    private courseListService: CourseListService,
    private matDialogService: MatDialogService,
    private containerCommunicationService: ContainerCommunicationService
  ) { }

  ngOnInit() {
    this.sub = this.containerCommunicationService.channel$.subscribe(
      data => this.search = data);
    this.filterField = 'startDate';
    this.isAsc = true;
    this.courseListService.getCoursesList().subscribe(courses => this.courseList = courses);
  }

  deletedCourse(item: Course): void {
    // TODO refactor
    this.matDialogService.show({
      title: 'Delete Action:',
      message: 'Do you really want to delete this course? ',
      icon: ''
    })
    .subscribe(confirmed => {
      if (confirmed) {
        console.log(confirmed);
        this.courseListService.deleteCourse(item);
      }
    });
  }
}
