import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickable]',
  standalone: true
})
export class ClickableDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    
    this.el.nativeElement.style['cursor'] = 'pointer';

  }

  @HostListener('mouseleave') onMouseLeave() {
    
    this.el.nativeElement.style['cursor'] = 'auto';

  }

  @HostListener('mousedown') onClick() {
    
    this.el.nativeElement.style['transform'] = 'scale(.95)';

    setTimeout(() => {
      this.el.nativeElement.style['transform'] = 'scale(1)';
    }, 100);

  }

}