import { Pipe, PipeTransform } from '@angular/core';
import { Cafe } from '../models/cafe.model';

@Pipe({
  name: 'cafeFilter',
  standalone: true,
})
export class CafeFilterPipe implements PipeTransform {
  transform(cafes: Cafe[], isPopular: boolean): Cafe[] {
    if (isPopular) {
      return cafes.filter((cafe) => cafe.isPopular);
    }

    return cafes;
  }
}
