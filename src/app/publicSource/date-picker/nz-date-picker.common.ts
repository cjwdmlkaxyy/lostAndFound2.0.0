import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nz-demo-date-picker-start-end',
  template: `
    <nz-date-picker
      [nzDisabledDate]="disabledStartDate"
      nzFormat="yyyy-MM-dd"
      [(ngModel)]="startValue"
      nzPlaceHolder="Start"
      (ngModelChange)="onStartChange($event)"
      [nzShowToday]="false"
      [nzPlaceHolder]="'请选择日期'"
    >
    </nz-date-picker>
    <nz-date-picker
      [nzDisabledDate]="disabledEndDate"
      nzFormat="yyyy-MM-dd"
      [(ngModel)]="endValue"
      nzPlaceHolder="End"
      (ngModelChange)="onEndChange($event)"
      [nzShowToday]="false"
      *ngIf="isShowEndPicker"
    >
    </nz-date-picker>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerStartEndComponent {
  @Input() isShowEndPicker: any;
  @Output() startDateVal = new EventEmitter<Date>();
  @Output() endDateVal = new EventEmitter<Date>();

  startValue: Date | null = null;
  endValue: Date | null = null;

  disabledStartDate = (startValue: Date): boolean => {
    let date = new Date();
    if (!startValue || this.endValue) {
      return this.endValue.getTime() <= startValue.getTime();
    }
    return (startValue.getTime() > date.getTime());
  };

  disabledEndDate = (endValue: Date): boolean => {
    let date = new Date();
    if (!endValue || !this.startValue) {
      return (endValue.getTime() > date.getTime());
    }
    return (endValue.getTime() <= this.startValue.getTime()) || (endValue.getTime() > date.getTime());
  };

  onStartChange(date: Date): void {
    this.startValue = date;
    this.startDateVal.emit(date);
  }

  onEndChange(date: Date): void {
    this.endValue = date;
    this.endDateVal.emit(date);
  }
}
