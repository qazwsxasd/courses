import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../../../../core/models/course.model';
import { MatDialogService } from '../../../../../core/dialogs/matDialog.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() item: Course;
  @Output() deleteCourse = new EventEmitter<Course>();

  constructor(private matDialogService: MatDialogService) { }

  ngOnInit() {
  }

  onDelete(item: Course) {
    this.deleteCourse.emit(item);

    // this.matDialogService.show({
    //   title: 'Delete Action:',
    //   message: 'Do you really want to delete this course? ',
    //   icon: ''
    // })
    // .subscribe(confirmed => {
    //   if (confirmed) {
    //     console.log(confirmed);
    //     this.deleteCourse.emit(item);
    //   }
    // })
    
  }

  ngOnDestroy() {
  }
}
