import { Component, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';

export const INPUT_NUMBER_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumberComponent),
  multi: true
};

export function createDurationValidator() {
  return (c: FormControl) => {
    let err = {
      rangeError: {
        given: c.value,
        max: 1000,
        min: 0
      }
    };

    return (c.value > 1000 || c.value < 0) ? err: null;
  };
}


@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputNumberComponent), multi: true },
    // { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputNumberComponent), multi: true }
  ]
})

export class InputNumberComponent implements ControlValueAccessor {
  currentValue: number;

  set duration(value) {
    if (value) {
      this.currentValue = value;
      this.onChange(value);
    }
  }

  get duration() {
    return this.currentValue;
  }

  constructor() {}

  onChange = (_) => {};
  onTouched = () => {};
  validateFn: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.duration = value;
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
