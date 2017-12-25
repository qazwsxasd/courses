import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})

export class DurationFormatPipe implements PipeTransform {
  transform(duration: number): string {
    const hours = Math.floor(Math.abs(duration) / 60);
    const mins = Math.abs(duration) % 60;
    return `${hours} h ${mins} min`;
  }
}
