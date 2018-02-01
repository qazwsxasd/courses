import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private course: Course;
  fg: FormGroup;

  constructor(
    private builder: FormBuilder // reactive forms
  ) { }

  ngOnInit() {
    // this.course = this.builder.group();
    // this.fg = new FormGroup({ // long way
    //   course: new FormGroup({
    //     title: new FormControl(''),
    //     description: new FormControl('')
    //   })
    // });

    this.fg = this.builder.group({
      courseName: this.builder.group({
        titleName: ''
      })
    });

    // this.fg.setValue({
    //   courseName: {
    //     titleName: ''
    //   }
    // });
  }

}
