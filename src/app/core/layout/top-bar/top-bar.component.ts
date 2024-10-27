import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { SearchComponent } from '../../components/search/search.component';
import { CafeService } from '../../../cafes/services/cafe.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, NavLinksComponent, SearchComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  options: { id: string; name: string }[] = [];
  constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
    this.cafeService.allCafes$.subscribe((res) => {
      this.options = res;
    });
  }
}
