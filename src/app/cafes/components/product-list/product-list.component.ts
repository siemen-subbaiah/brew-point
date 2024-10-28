import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/cafe.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    TruncatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  quantity: number = 0;
  @Input({ required: true }) product!: Product;

  onAddItem() {
    this.quantity++;
  }

  onRemoveItem() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
