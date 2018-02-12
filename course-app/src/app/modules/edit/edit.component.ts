import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Course } from '../../core/models/course.model';

export const errorMessages = {
  'title': { minLength: 'sdsd' } // TODO
};

@Component({
  selector: 'app-course-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  private course: Course;
  author_list: [{ name: 'one', checked: false}, { name: 'two', checked: true}];
  formCourse: FormGroup;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.formCourse = this.builder.group({
      titleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descriptionName: ['', [Validators.required, Validators.maxLength(5)]],
      startDateName: [null, Validators.required],
      authorName: [null, Validators.required],
      durationName: [0, Validators.required]
    });

    this.formCourse.valueChanges.subscribe(value => console.log(`changed ${value}`));
  }

  // private initForm(item: Course): void { // item -> deepCopy(item) ->
  //   this.formCourse.setValue({
  //     courseName: {
  //       titleName: item.name
  //     }
  //   });
  // }

  addNew() {
    this.formCourse.reset();
  }

  setRadio(): void {
    // const control = this.formCourse.get('courseName').get('titleName');
    // let value = control.value + ' 1';
    // control.setValue(value);
  }

  submit(form) {

  }

  setErrorClass(elementName: string) {
    return {
      'show-error': (this.formCourse.controls[elementName].dirty && this.formCourse.controls[elementName].invalid)
    };
  }

  private displpayErrorMessage(elementName: string): boolean {
    return !!((this.formCourse.controls[elementName].touched || this.formCourse.controls[elementName].dirty)
      && this.formCourse.controls[elementName].errors);
  }

  get titleName() { return this.formCourse.get('titleName'); }
  get descriptionName() { return this.formCourse.get('descriptionName'); }
  get durationName() { return this.formCourse.get('durationName'); }

}
