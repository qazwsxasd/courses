import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

import * as moment from 'moment';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateFormatComponent),
  multi: true
};

export const DATE_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateFormatComponent),
  multi: true
};

export function DateValidator(period = 14) {
  const deltaDays = moment().subtract(period, 'days');
  return (c: FormControl) => {
    const err = {
      dateError: {
        given: c.value,
        period
      }
    };

    console.log(moment(c.value) < deltaDays);

    return (!c.value || moment(c.value) < deltaDays) ? err : null;
  };
}

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss'],
  providers: [DATE_VALUE_ACCESSOR, DATE_VALUE_VALIDATOR]
})
export class DateFormatComponent implements ControlValueAccessor {
  @Input() invalid = false;
  private _value: any = '';
  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};
  validateFn: any = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
