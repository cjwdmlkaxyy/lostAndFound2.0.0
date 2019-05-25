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


@Pipe({
  name: 'GoodsStatus'
})
export class GoodsStatus implements PipeTransform {
  transform(val: any, flag: string) {
    if (flag === 'found') {
      if (val === 0) {
        return '待领取';
      } else if (val === 1) {
         return '已被领';
      } else if (val === 2) {
        return '已失效';
      }
    } else {
      if (val === 0) {
        return '寻找中';
      } else if (val === 1) {
        return '已找到';
      } else if (val === 2) {
        return '已失效';
      }
    }
  }
}
