import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BreakPointService } from '../../services/break-point.service';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatSelectModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  tables = [
    {
      id: 1,
      name: 'Table-1',
      info: '2-4 people',
    },
    {
      id: 2,
      name: 'Table-2',
      info: '3-6 people',
    },
    {
      id: 3,
      name: 'Table-1',
      info: '6-10 people',
    },
  ];
  orderType!: number | null;
  tableId!: number;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number | null,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public breakPointService: BreakPointService,
    private router: Router,
  ) {
    this.orderType = data;
  }

  onTableChange(e: MatOptionSelectionChange) {
    this.tableId = +e.source.value;
  }

  onSelectType(type: 0 | 1 | 2) {
    localStorage.setItem('orderType', type.toString());
    this.orderType = type;
  }

  proccedToCart() {
    this.router.navigate(['/cart']);
    this.bottomSheetRef.dismiss();
  }
}
