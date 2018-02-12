import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';

export const INPUT_AUTHORS_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ListAuthorsComponent),
  multi: true
};

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss'],
  // providers: [INPUT_AUTHORS_ACCESSOR, INPUT_AUTHORS_VALIDATORS]
  providers: [INPUT_AUTHORS_ACCESSOR]
})

export class ListAuthorsComponent implements ControlValueAccessor {
  @Input('authors') authors: any[];
  currentValue: any;

  constructor() {
    console.log(this);
  }

  set value(value) {
    if (value) {
      this.currentValue = value;
      const currentItemIndex = this.authors.findIndex(item => item.name === value);
      this.authors[currentItemIndex].checked = !this.authors[currentItemIndex].checked;
      this.onChange(value);
    }
  }

  get value() {
    return this.currentValue;
  }

  setValue(item) {
    this.value = item.target.value;
  }

  onChange = (_) => {};
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value !== this.currentValue) {
      this.currentValue = value;
    }
  }
}
