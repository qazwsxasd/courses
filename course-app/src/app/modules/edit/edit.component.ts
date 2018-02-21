import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';

import { AuthorsListService } from './edit.service';
import { DurationValidator } from './duration/duration.component';
import { DateValidator } from './date-format/date-format.component';

import { Course, AuthorConvertedShape, AuthorShape } from '../../core/models/course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  private course: Course;
  private courseEdit: Course;
  private courseNew: Course;
  author_list: Array<AuthorConvertedShape>;
  formCourse: FormGroup;
  isFormReady: boolean;
  duration = 0;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { course: Course, authors: any[] }) => {
      this.courseEdit = Object.assign({}, data.course);
      this.courseNew = Object.assign({}, data.course);
      this.author_list = data.authors;

      if (this.courseEdit.authors && this.author_list) {
        this.courseEdit.authors.map((item: AuthorShape) => {
          this.author_list.map((author: AuthorConvertedShape) => {
            if (item.id === author.id) {
              author.checked = true;
            }
          });
        });
      }

    // }).then(res => {
      this.formCourse = this.builder.group({
        titleName: [this.courseEdit.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        descriptionName: [this.courseEdit.description, [Validators.required, Validators.maxLength(500)]],
        startDateName: [this.convertDateToInput(this.courseEdit.startDate), [Validators.required, DateValidator()]],
        authorName: this.builder.array(this.author_list),
        durationName: [this.courseEdit.duration, [Validators.required, DurationValidator(500, 0)]]
      });
      this.isFormReady = true;
    });

    // this.authorsListService.getAuthorsList()
    //   .subscribe(list => {
    //     this.author_list = list;
    //
    //     this.formCourse = this.builder.group({
    //       titleName: [this.courseEdit.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    //       descriptionName: [this.courseEdit.description, [Validators.required, Validators.maxLength(500)]],
    //       startDateName: [new Date(this.courseEdit.startDate).toISOString().slice(0, 10), [Validators.required, DateValidator()]],
    //       authorName: this.builder.array(this.author_list),
    //       durationName: [this.courseEdit.duration, [Validators.required, DurationValidator(500, 0)]]
    //     });
    //     this.isFormReady = true;
    //   });

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
    // this.formCourse.reset();
  }

  returnBack() {
    this.router.navigate(['edit']);
  }

  submit(form) { }

  setErrorClass(elementName: string) {
    return {
      'show-error': (this.formCourse.controls[elementName].dirty && this.formCourse.controls[elementName].invalid)
    };
  }

  private displpayErrorMessage(elementName: string): boolean {
    return !!((this.formCourse.controls[elementName].touched || this.formCourse.controls[elementName].dirty)
      && this.formCourse.controls[elementName].errors);
  }

  private convertDateToInput(date: string): string {
    return date ? new Date(date).toISOString().slice(0, 10) : '';
  }

  get titleName() { return this.formCourse.get('titleName'); }
  get descriptionName() { return this.formCourse.get('descriptionName'); }
  get durationName() { return this.formCourse.get('durationName'); }
  get authorName() { return this.formCourse.get('authorName'); }
  get startDateName() { return this.formCourse.get('startDateName'); }
}
