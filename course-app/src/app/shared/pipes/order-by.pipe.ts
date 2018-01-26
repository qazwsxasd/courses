import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderItemsBy'
})

export class OrderItemsByPipe implements PipeTransform {
  transform<T>(array: T[], field: string, isAsc: boolean = true): T[] {
    if (!array.length || !field) {
      return array;
    }
    let result: T[] = [];
    if (isAsc) {
      result = array.sort((item1: T, item2: T) => {
        if (item1[field] > item2[field]) { return 1; }
        if (item1[field] < item2[field]) { return -1; }
        return 0;
      });
    } else {
      result = array.sort((item1: T, item2: T) => {
        if (item1[field] < item2[field]) { return 1; }
        if (item1[field] > item2[field]) { return -1; }
        return 0;
      });
    }
    return result;
  }
}
