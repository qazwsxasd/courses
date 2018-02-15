import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export const DURATION_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DurationComponent),
  multi: true
};

export const DURATION_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DurationComponent),
  multi: true
};

export function DurationValidator(maxValue, minValue) {
  return (c: FormControl) => {
    const err = {
      rangeError: {
        given: c.value,
        max: maxValue || 1000,
        min: minValue || 0
      }
    };

    return (Number(c.value) > maxValue || Number(c.value) < minValue) ? err : null;
  }
}

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    DURATION_VALUE_ACCESSOR,
    DURATION_VALIDATOR
  ]
})

export class DurationComponent implements ControlValueAccessor {
  @Input() nameOption: string;
  @Input() invalid = false;

  currentValue: any;
  onChange = (_) => {};

  setValue(item) {
    this.value = item.target.value;
  }

  set value(newValue) {
    if (newValue) {
      this.currentValue = newValue;
      this.onChange(newValue);
    }
  }

  get value() {
    return this.currentValue;
  }

  onTouched = () => {};
  validateFn: any = () => {};

  registerOnChange(fn) { // +
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { // +
    this.onTouched = fn;
  }

  writeValue(value) { // +
    if (value) {
      this.currentValue = value;
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  // optional setDisabledState
}
