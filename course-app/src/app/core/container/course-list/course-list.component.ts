import { Component, OnInit } from '@angular/core';

import { FetchService } from '../../../services/fetch.service';
import { ICourse } from '../../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courseList: ICourse[];

  constructor(
    private fetchService: FetchService
  ) { }

  ngOnInit() {
    this.courseList = this.fetchService.getCoursesList();
    console.log('sd', this.courseList);
  }

}
