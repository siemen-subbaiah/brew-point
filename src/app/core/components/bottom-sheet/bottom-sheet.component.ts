import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BreakPointService } from '../../services/break-point.service';
import { FormsModule } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatTimepickerModule,
  provideNativeDateTimeAdapter,
} from '@dhutaryan/ngx-mat-timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  providers: [provideNativeDateAdapter(), provideNativeDateTimeAdapter()],
})
export class BottomSheetComponent implements OnInit {
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
  guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  orderType!: number | null;
  tableId!: number | null;
  guest!: number | null;
  selectedDate!: Date | null;
  selectedTime!: Date | null;
  selectedEndTime!: Date | null;
  alreadySelectedOrderType!: number;
  cafeID!: string;
  cafeName!: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      orderType: number;
      cafeID: string;
      cafeName: string;
    },
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public breakPointService: BreakPointService,
    private router: Router,
    private utilService: UtilService,
  ) {
    this.alreadySelectedOrderType = data?.orderType;
    this.orderType = data?.orderType;
    this.cafeID = data?.cafeID;
    this.cafeName = data?.cafeName;
  }

  ngOnInit(): void {
    const orderDetails = this.utilService.getOrderDetails();
    if (orderDetails) {
      this.orderType = this.alreadySelectedOrderType
        ? this.alreadySelectedOrderType
        : orderDetails.orderType;
      this.tableId = orderDetails.tableId;
      this.guest = orderDetails.guest;
      this.selectedDate = orderDetails.selectedDate;
      this.selectedTime = orderDetails.selectedTime;
      this.selectedEndTime = orderDetails.selectedEndTime;
    }
  }

  onSelectType(type: 1 | 2) {
    this.orderType = type;
  }

  proccedToCart() {
    const orderDetails = {
      orderType: this.orderType,
      cafeID: this.cafeID,
      cafeName: this.cafeName,
      tableId: this.tableId,
      guest: this.guest,
      selectedDate: this.selectedDate,
      selectedTime: this.selectedTime,
      selectedEndTime: this.selectedEndTime,
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    this.router.navigate(['/cart']);
    this.bottomSheetRef.dismiss(orderDetails);
  }

  resetOptions() {
    this.orderType = null;
    localStorage.removeItem('orderDetails');
  }
}
