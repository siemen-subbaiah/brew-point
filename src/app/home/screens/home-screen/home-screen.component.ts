import { Component, OnDestroy, OnInit } from '@angular/core';
import { CafeService } from '../../../cafes/services/cafe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CafeListComponent } from '../../components/cafe-list/cafe-list.component';
import { Cafe } from '../../../cafes/models/cafe.model';
import { Subscription } from 'rxjs';
import { BreakPointService } from '../../../core/services/break-point.service';
import { SearchComponent } from '../../../core/components/search/search.component';
import { OrderTypeComponent } from '../../../core/components/order-type/order-type.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CafeListComponent,
    SearchComponent,
    OrderTypeComponent,
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  loading!: boolean;
  cafes!: Cafe[];
  options: { id: string; name: string }[] = [];
  cafeSub = new Subscription();
  constructor(
    private cafeService: CafeService,
    public breakPointService: BreakPointService
  ) {}

  ngOnInit() {
    this.listPopularCafes();
  }

  listPopularCafes() {
    this.loading = true;
    this.cafeSub = this.cafeService.listPopularCafes().subscribe({
      next: (res) => {
        this.cafes = res;
        this.options = res.map((cafe) => ({ id: cafe.id, name: cafe.name }));
        this.cafeService.allCafes$.next(
          res.map((cafe) => ({ id: cafe.id, name: cafe.name }))
        );
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.cafeSub.unsubscribe();
  }
}
