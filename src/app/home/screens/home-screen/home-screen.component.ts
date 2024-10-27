import { Component, OnDestroy, OnInit } from '@angular/core';
import { CafeService } from '../../../cafes/services/cafe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CafeListComponent } from '../../components/cafe-list/cafe-list.component';
import { Cafe } from '../../../cafes/models/cafe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CafeListComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  cafes!: Cafe[];
  cafeSub = new Subscription();
  constructor(private cafeService: CafeService) {}

  ngOnInit() {
    this.listPopularCafes();
  }

  listPopularCafes() {
    this.cafeSub = this.cafeService.listPopularCafes().subscribe({
      next: (res) => {
        this.cafes = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.cafeSub.unsubscribe();
  }
}
