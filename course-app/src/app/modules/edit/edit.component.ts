import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import { AuthorsListService } from './edit.service';

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
  // author_list = [{ name: 'one', checked: false}, { name: 'two', checked: true}];
  author_list: Array<{ name: string, checked: boolean}>; // [{ name: 'one', checked: false}, { name: 'two', checked: true}];
  // authors_list = ['one', 'two'];
  formCourse: FormGroup;
  isFormReady: boolean;
  duration = 0;

  constructor(
    private builder: FormBuilder,
    private authorsListService: AuthorsListService
  ) {

  }

  ngOnInit() {


    this.authorsListService.getAuthorsList()
      .subscribe(list => {
        this.author_list = list;

        this.formCourse = this.builder.group({
          titleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          descriptionName: ['', [Validators.required, Validators.maxLength(5)]],
          startDateName: [null, Validators.required],
          authorName: this.builder.array(this.author_list),
          durationName: [this.duration, Validators.required]
        });
        this.isFormReady = true;
      });

    // this.formCourse.valueChanges.subscribe(value => console.log(`changed ${value}`));
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

  submit(form) {

  }

  setErrorClass(elementName: string) {
    console.log('element', elementName);
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
  get authorName() { return this.formCourse.get('authorName'); }

  // get authorName(): FormArray {
  //   return <FormArray>this.formCourse.get('authorName');
  // }

}
