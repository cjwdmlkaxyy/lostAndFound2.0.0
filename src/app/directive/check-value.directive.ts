import {Directive,ElementRef,HostListener,Input} from '@angular/core';

@Directive({
  selector:'[checkValue]'
})

export class CheckValueDirective{
  constructor(private el: ElementRef){}

  @HostListener('blur') onBlur(){
    return true;
  }
}
