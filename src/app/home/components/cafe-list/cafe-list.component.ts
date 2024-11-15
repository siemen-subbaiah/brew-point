import { Component, Input } from '@angular/core';
import { Cafe } from '../../../cafes/models/cafe.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-cafe-list',
  standalone: true,
  imports: [RouterLink, TruncatePipe, MatCardModule, MatButtonModule],
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.scss',
})
export class CafeListComponent {
  @Input({ required: true }) cafe!: Cafe;
  @Input({ required: true }) isHome!: boolean;
}
