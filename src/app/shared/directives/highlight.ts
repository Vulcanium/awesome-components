import { AfterViewInit, Directive, ElementRef, HostListener, input, InputSignal, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight implements AfterViewInit {

  color: InputSignal<string> = input<string>('yellow');

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color());
  }

  setBackgroundColor(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('orange');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.color());
  }

  @HostListener('click') onClick() {
    this.setBackgroundColor('lightgreen');
  }

}
