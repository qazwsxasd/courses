import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Course } from '../../../../../core/models/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {
  @Input() item: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor(private router: Router) { }

  ngOnInit() { }

  onEdit(id) {
    this.router.navigate([`edit/${id}`]);
  }

  onDelete(item: Course) {
    this.deleteCourse.emit(item);
  }
}
