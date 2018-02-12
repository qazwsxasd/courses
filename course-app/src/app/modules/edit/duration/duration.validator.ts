import { FormControl } from '@angular/forms';

export function validateDuration(c: FormControl): {[key: string]: null | {} } {
  const DURATION_REGEXP = new RegExp('[0-9]');

  return DURATION_REGEXP.test(c.value) ? {} : { invalidDuration: true };
}
