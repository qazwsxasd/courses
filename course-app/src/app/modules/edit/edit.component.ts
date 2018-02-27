import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';

import { MatDialogService} from '../../core/dialogs/matDialog.service';
import { CourseListService } from '../../core/services/course-list.service';

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
  author_list: Array<AuthorConvertedShape>;
  formCourse: FormGroup;
  isFormReady: boolean;
  duration = 0;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matDialogService: MatDialogService,
    private courseListService: CourseListService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { course: Course, authors: any[] }) => {

      if (data.course) {
        this.courseEdit = Object.assign({}, data.course);
      } else {
        this.courseEdit = new Course( 0, '', false, '', '', '', 0, []);
      }
      Object.assign(this.courseEdit, { startDate: this.convertDateToInput(this.courseEdit.startDate) });

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

    // }).then(res => { // ?
      this.formCourse = this.builder.group({
        titleName: [this.courseEdit.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        descriptionName: [this.courseEdit.description, [Validators.required, Validators.maxLength(500)]],
        startDateName: [this.courseEdit.startDate, [Validators.required, DateValidator()]],
        authorsName: this.builder.array(this.author_list),
        durationName: [this.courseEdit.duration, [Validators.required, DurationValidator(500, 0)]]
      });

      this.isFormReady = true;
    });
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const res = [
      this.courseEdit.name === this.titleName!.value,
      this.courseEdit.description === this.descriptionName!.value,
      this.courseEdit.duration === this.durationName!.value,
      this.convertDateToInput(this.courseEdit.startDate) === this.startDateName!.value
    ].every((element) => element);

    if (res) { return true; }

    return this.matDialogService.show({ title: 'Warning', message: 'Disacard changes?', icon: '' });
  }

  saveData() {
    const data = this.formCourse.value;
    Object.assign(this.courseEdit, {
      name: data.titleName,
      description: data.descriptionName,
      duration: data.durationName,
      startDate: data.startDateName
    });

    if (this.courseEdit.id) {
      this.courseListService.updateCourse(this.courseEdit)
        .subscribe(
          () => {},
          (err) => console.log(`can't update data: ${err}`),
          () => this.returnBack())
    } else {
      this.courseListService.addItemToCourseList(this.courseEdit);
    }
    // should be error handler
  }

  get titleName() { return this.formCourse.get('titleName'); }
  get descriptionName() { return this.formCourse.get('descriptionName'); }
  get durationName() { return this.formCourse.get('durationName'); }
  get authorsName() { return this.formCourse.get('authorsName'); }
  get startDateName() { return this.formCourse.get('startDateName'); }
}
