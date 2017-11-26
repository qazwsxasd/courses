import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from '../../../../models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() item: ICourse;

  constructor() { }

  ngOnInit() {
  }

}
