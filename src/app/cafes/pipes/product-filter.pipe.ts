import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/cafe.model';

@Pipe({
  name: 'productFilter',
  standalone: true,
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], type: number): Product[] {
    if (type >= 0) {
      return products.filter((product) => product.productType === type);
    }
    return products;
  }
}
