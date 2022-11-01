import { Directive, ElementRef, Input, OnChanges, SimpleChanges,  } from '@angular/core';
import { MmsState } from 'src/app/models/mms-state';

@Directive({
  selector: '[mms]'
})
export class MmsDirective implements OnChanges{

  @Input() mms: MmsState = new MmsState();

  constructor(public el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style["transform"] = "translate(-" + changes.mms.currentValue.containerSize * changes.mms.currentValue.elementOnScreen + "vw)";
  }

}