import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormArray } from '@angular/forms';

export const INPUT_AUTHORS_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ListAuthorsComponent),
  multi: true
};

export const INPUT_AUTHORS_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ListAuthorsComponent),
  multi: true
};

export function AuthorListValidator() {
  return (controlArray: FormArray) => {
    const err = {
      listError: {
        given: controlArray.value,
      }
    };

    const res = controlArray.value.find(item => item.checked);
    return ( !controlArray.value || !res ) ? err : null;
  };
}

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss'],
  providers: [INPUT_AUTHORS_ACCESSOR, INPUT_AUTHORS_VALIDATOR]
  // providers: [INPUT_AUTHORS_ACCESSOR]
})

export class ListAuthorsComponent implements ControlValueAccessor {
  @Input('authors') authors: any[];
  currentValue: any;

  constructor() { }

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
  validateFn: any = () => {};

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

  validate(c: FormArray) {
    return this.validateFn(c);
  }
}
