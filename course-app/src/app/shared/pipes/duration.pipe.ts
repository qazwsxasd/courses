import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})

export class DurationFormatPipe implements PipeTransform {
  transform(duration: number): string {
    if (!Number(duration)) { return `0 h 0 min`; }
    const hours = Math.floor(Math.abs(duration) / 60);
    const mins = Math.abs(duration) % 60;
    return `${hours} h ${mins} min`;
  }
}
