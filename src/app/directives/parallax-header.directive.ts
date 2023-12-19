import {
  Directive,
  AfterViewInit,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
} from '@angular/core';
import { DomController } from '@ionic/angular';
@Directive({
  selector: '[appParallaxHeader]',
})
export class ParallaxHeaderDirective implements AfterViewInit {
  @Input() parallaxImagePath: string;
  @Input() parallaxHeight: number;
  private headerHeight: number;
  private header: HTMLDivElement;
  private mainContent: HTMLDivElement;
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {}
  @HostListener('ionScroll', ['$event'])
  onContentScroll(ev) {
    let translateAmt: number;
    let scaleAmt: number;
    const scrollTop = ev.detail.scrollTop;

    console.log('ya paso', { scrollTop });

    if (scrollTop >= 56) {
      console.log('Muestra el toolbar');
    } else {
      console.log('NO Muestra el toolbar');
    }

    const targetHeight = this.headerHeight - scrollTop;

    // Already scrolled past the point at which the header image is visible
    if (scrollTop > this.parallaxHeight) {
      return;
    }

    // if (targetHeight >= ) {
    //   return;
    // }


    if (scrollTop >= 0) {
      translateAmt = -(scrollTop / 2);
      scaleAmt = 1;
    } else {
      translateAmt = 0;
      scaleAmt = -scrollTop / this.headerHeight + 1;
    }
    this.domCtrl.write(() => {
      // this.renderer.setStyle(
      //   this.header,
      //   'transform',
      //   `translateY(${translateAmt}px) scale(${scaleAmt})`
      // );

      this.renderer.setStyle(
        this.header,
        'height',
        `${this.headerHeight - scrollTop}px`
      );


      this.renderer.setStyle(
        this.mainContent,
        'transform',
        `translateY(${-scrollTop}px)`
      );
    });
  }
  
  ngAfterViewInit() {
    this.headerHeight = this.parallaxHeight;
    this.mainContent = this.element.nativeElement.querySelector(
      '.main-content'
    );
    this.domCtrl.write(() => {
      this.header = this.renderer.createElement('div');
      this.renderer.insertBefore(
        this.element.nativeElement,
        this.header,
        this.element.nativeElement.firstChild
      );
      this.renderer.setStyle(
        this.header,
        'background',
        `url(${this.parallaxImagePath}) no-repeat`
      );
      this.renderer.setStyle(this.header, 'height', `${this.headerHeight}px`);
      this.renderer.setStyle(this.header, 'background-size', 'cover');
      this.renderer.setStyle(this.header, 'background-position', 'center');
      this.renderer.setStyle(this.header, 'will-change', `transform`);
      this.renderer.setStyle(this.mainContent, 'will-change', `transform`);
    });
  }
}