import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

export class UnlessDirective{

  private hasView = false;

  constructor(
    private templateref: TemplateRef<any>,
    private viewcontaineref: ViewContainerRef
  ){}

  @Input() set appUnless(condition: boolean){
    if(!condition && !this.hasView){
      this.viewcontaineref.createEmbeddedView(this.templateref);
      this.hasView = true;
    }else if(condition && this.hasView){
      this.viewcontaineref.clear();
      this.hasView = false;
    }
  }

}
