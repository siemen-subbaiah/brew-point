import { Component, OnInit, OnDestroy } from '@angular/core';
import { CafeService } from '../../services/cafe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cafe, Product } from '../../models/cafe.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { BreakPointService } from '../../../core/services/break-point.service';
import { SpinnerComponent } from '../../../core/components/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetComponent } from '../../../core/components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartService } from '../../../cart/services/cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-cafe-detail-screen',
  standalone: true,
  imports: [
    ProductListComponent,
    SpinnerComponent,
    ProductFilterPipe,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './cafe-detail-screen.component.html',
  styleUrl: './cafe-detail-screen.component.scss',
})
export class CafeDetailScreenComponent implements OnInit, OnDestroy {
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
  cafeSub = new Subscription();
  productsSub = new Subscription();
  currentOrderSub = new Subscription();

  constructor(
    private bottomSheet: MatBottomSheet,
    public breakPointService: BreakPointService,
    private cafeService: CafeService,
    public cartService: CartService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.cafeSub = this.cafeService.getCafeById(id).subscribe({
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
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  listProducts(id: string) {
    this.productsLoading = true;
    this.productsSub = this.cafeService.listProductsByCafeId(id).subscribe({
      next: (res) => {
        const serverData = res;
        const cartLocalData = JSON.parse(
          localStorage.getItem('cartItems')!,
        ) as Product[];
        if (cartLocalData?.length) {
          this.products = serverData.map((data) => {
            const findProduct = cartLocalData.find(
              (cart) => cart.id === data.id,
            );
            if (findProduct) {
              return {
                ...data,
                quantity: findProduct.quantity,
                cafeId: this.cafeId,
                cafeName: this.cafe.name,
              };
            }
            return {
              ...data,
              quantity: 0,
              cafeId: this.cafeId,
              cafeName: this.cafe.name,
            };
          });
        } else {
          this.products = serverData.map((data) => {
            return {
              ...data,
              quantity: 0,
              cafeId: this.cafeId,
              cafeName: this.cafe.name,
            };
          });
        }
        this.productsLoading = false;
      },
      error: () => {
        this.productsLoading = false;
        this.utilService.openSnackBar(
          'Something went wrong, please try again later.',
        );
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

  onOpenBottomSheet() {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        orderType: 0,
        cafeID: this.cafeId,
        cafeName: this.cafe.name,
      },
    });
  }

  ngOnDestroy() {
    this.queryParamSub.unsubscribe();
    this.cafeSub.unsubscribe();
    this.productsSub.unsubscribe();
    this.currentOrderSub.unsubscribe();
  }
}
