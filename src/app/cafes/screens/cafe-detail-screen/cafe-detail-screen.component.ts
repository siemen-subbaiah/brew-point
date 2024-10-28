import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../services/cafe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cafe, Product } from '../../models/cafe.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatChipListboxChange,
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { BreakPointService } from '../../../core/services/break-point.service';

@Component({
  selector: 'app-cafe-detail-screen',
  standalone: true,
  imports: [
    ProductListComponent,
    ProductFilterPipe,
    NgOptimizedImage,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './cafe-detail-screen.component.html',
  styleUrl: './cafe-detail-screen.component.scss',
})
export class CafeDetailScreenComponent implements OnInit {
  cafeId!: string;
  loading!: boolean;
  productsLoading!: boolean;
  noData!: boolean;
  cafe!: Cafe;
  products!: Product[];
  filters = [
    {
      id: -1,
      name: 'All',
    },
    {
      id: 0,
      name: 'Beverages',
    },
    {
      id: 1,
      name: 'Snacks',
    },
    {
      id: 2,
      name: 'Deserts',
    },
  ];
  selectedFilter = -1;
  queryParamSub = new Subscription();

  constructor(
    public breakPointService: BreakPointService,
    private cafeService: CafeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cafeId = this.route.snapshot.params['id'];
    this.getCafe(this.cafeId);
    this.listProducts(this.cafeId);

    this.queryParamSub = this.route.queryParamMap.subscribe((params) => {
      this.selectedFilter = params.get('type')
        ? Number(params.get('type'))
        : -1;
    });
  }

  getCafe(id: string) {
    this.loading = true;
    this.cafeService.getCafeById(id).subscribe({
      next: (res) => {
        if (res) {
          this.cafe = res;
        } else {
          this.noData = true;
        }
      },
      error: (err) => {
        this.noData = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  listProducts(id: string) {
    this.productsLoading = true;
    this.cafeService.listProductsByCafeId(id).subscribe({
      next: (res) => {
        this.products = res;
        console.log(this.products);
        this.productsLoading = false;
      },
    });
  }

  onFilterChange(e: MatChipListboxChange) {
    this.selectedFilter = +e.value;
    this.router.navigate(['/cafes', this.cafeId], {
      queryParams: {
        type: e.value,
      },
      queryParamsHandling: 'merge',
    });
  }
}
