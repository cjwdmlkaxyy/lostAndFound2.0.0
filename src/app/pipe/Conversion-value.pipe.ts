import { Pipe, PipeTransform } from '@angular/core';
import { PublicDateService } from '../service/public-date.service';
import { SlicePipe } from '@angular/common';

@Pipe({
  name: 'conversionValue'
})

export class ConversionValuePipe implements PipeTransform {

  constructor(private publicDate: PublicDateService) { }

  goodsType = this.publicDate.goodsType;

  transform(value: any): any {
    for (let item of this.goodsType) {
      if (value === item.key) {
          return item.val;
      }
    }
  }
}

@Pipe({
  name: 'filterInfosValue'
})
export class SecrecyPhone implements PipeTransform {
  transform(val: string, flag: string) {
    let value = '';
    if (flag === 'place') {
        value = val.slice(0, 5) + '……';
    } else if (flag === 'phone') {
      value = val.slice(0, 3) + 'xxxx' + val.slice(7, 11);
    }
    return value;
  }
}
