import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NavLinksComponent } from '../nav-links/nav-links.component';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, NavLinksComponent],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss',
})
export class BottomBarComponent {}
