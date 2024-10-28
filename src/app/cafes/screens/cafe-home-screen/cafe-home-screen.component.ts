import { Component } from '@angular/core';
import { Cafe } from '../../models/cafe.model';
import { Subscription } from 'rxjs';
import { CafeService } from '../../services/cafe.service';
import { BreakPointService } from '../../../core/services/break-point.service';
import { SearchComponent } from '../../../core/components/search/search.component';
import { CafeListComponent } from '../../../home/components/cafe-list/cafe-list.component';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { CafeFilterPipe } from '../../pipes/cafe-filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cafe-home-screen',
  standalone: true,
  imports: [SearchComponent, CafeListComponent, CafeFilterPipe, MatChipsModule],
  templateUrl: './cafe-home-screen.component.html',
  styleUrl: './cafe-home-screen.component.scss',
})
export class CafeHomeScreenComponent {
  loading!: boolean;
  cafes!: Cafe[];
  options: { id: string; name: string }[] = [];
  isPopular!: boolean;
  cafeSub = new Subscription();
  queryParamSub = new Subscription();

  constructor(
    public breakPointService: BreakPointService,
    private cafeService: CafeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listCafes();
    this.queryParamSub = this.route.queryParamMap.subscribe((params) => {
      this.isPopular = params.get('isPopular') === 'true';
    });
  }

  listCafes() {
    this.loading = true;
    this.cafeSub = this.cafeService.listCafes().subscribe({
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

  onFilterApplied(e: MatChipSelectionChange) {
    if (e.selected) {
      this.isPopular = true;
    } else {
      this.isPopular = false;
    }
    this.router.navigate(['/cafes'], {
      queryParams: {
        isPopular: this.isPopular,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.cafeSub.unsubscribe();
    this.queryParamSub.unsubscribe();
  }
}
