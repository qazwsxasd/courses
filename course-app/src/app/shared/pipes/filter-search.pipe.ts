import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Pipe({
  name: 'filterSearch'
})

export class FilterSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): Observable<any[]> {
    if (!items) { return of([]); }
    if (!searchText) { return of(items); }
    searchText = searchText.toLowerCase();
    return of(items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    }));
  }
}


// export class FilterSearchPipe implements PipeTransform {
//   transform(items: any[], searchText: string): any[] {
//     if (!items) { return []; }
//     if (!searchText) { return items; }
//     searchText = searchText.toLowerCase();
//     return items.filter( it => {
//       return it.name.toLowerCase().includes(searchText);
//     });
//   }
// }
