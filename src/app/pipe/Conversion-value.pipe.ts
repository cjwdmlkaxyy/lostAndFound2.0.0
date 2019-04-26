import { Pipe, PipeTransform } from '@angular/core';
import { PublicDateService } from '../service/public-date.service';

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
