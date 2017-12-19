import { Pipe, PipeTransform } from '@angular/core';

import { Course } from '../../../../../core/models/course.model';

@Pipe({
  name: 'orderItemsBy'
})

export class OrderItemsByPipe implements PipeTransform {
  transform(array: Array<Course>, field: string, isAsc: boolean): Array<Course> {
    if (!array || !field) {
      return array;
    }
    let result: Course[] = [];
    if (isAsc) {
      result = array.sort((item1: Course, item2: Course) => {
        if (item1[field] > item2[field]) { return 1; }
        if (item1[field] < item2[field]) { return -1; }
        return 0;
      });
    } else {
      result = array.sort((item1: Course, item2: Course) => {
        if (item1[field] < item2[field]) { return 1; }
        if (item1[field] > item2[field]) { return -1; }
        return 0;
      });
    }
    return result;
  }
}
