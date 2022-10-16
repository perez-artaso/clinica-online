import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { WelcomePageBgImgManager } from '../models/welcome-page-bg-img-manager';

@Directive({
  selector: '[appRandomBgImage]'
})
export class RandomBgImageDirective {

  constructor(private el: ElementRef,  private renderer: Renderer2) { 
    this.setBackImg();
  }

  setBackImg(){
    this.renderer.setStyle(this.el.nativeElement, 'background-image', 'url(' + (new WelcomePageBgImgManager).getRandomPreSettedImageSource() + ')');
  }

}