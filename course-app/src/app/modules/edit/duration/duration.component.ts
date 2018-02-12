import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DurationComponent),
  multi: true
};

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    // { provide: NG_VALIDATORS, useExisting: forwardRef(() => DurationComponent), multi: true }
  ]
})

export class DurationComponent implements ControlValueAccessor {
  @Input() nameOption: string;
  currentValue: any;

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

  onChange = (_) => {};
  onTouched = () => {};

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

  // optional setDisabledState
}
