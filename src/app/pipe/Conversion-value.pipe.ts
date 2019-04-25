import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion-value-pipe'
})

export class ConversionValuePipe implements PipeTransform{
  transform(value: any, ...args): any {
  }
}
