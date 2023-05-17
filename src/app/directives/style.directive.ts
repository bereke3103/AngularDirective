import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStyle]',
})
export class StyleDirective {
  @Input('checkColor') color: string = 'red';

  @Input('allStyles') allStyles: { border: string; fontWeight: string } | any;

  constructor(private elRef: ElementRef, private r: Renderer2) {
    // console.log(elRef);
    //!1 первый способ написания стилей
    //! elRef.nativeElement.style.color = 'red';

    //!2 способ написания стилей
    //более универсальный способ
    this.r.setStyle(this.elRef.nativeElement, 'cursor', 'pointer');
    this.r.setStyle(this.elRef.nativeElement, 'color', 'red');
  }

  @HostListener('click', ['$event.target']) onClick(event: Event) {
    console.log(event);
  }

  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.elRef.nativeElement, 'border', this.allStyles?.border);
    this.r.setStyle(
      this.elRef.nativeElement,
      'fontWeight',
      this.allStyles?.fontWeight
    );
    this.r.setStyle(this.elRef.nativeElement, 'color', this.color);
    this.r.setStyle(this.elRef.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseleave') onLeave() {
    this.r.setStyle(this.elRef.nativeElement, 'color', 'black');
  }
}
