import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('cartAnimation', { static: false }) cartAnimationRef!: ElementRef;

  ngAfterViewInit(): void {
    const cartAnimation = this.cartAnimationRef.nativeElement;
    const headerWidth = cartAnimation.parentElement.clientWidth;
    const animationDuration = 6000; // in milliseconds
    const animationDelay = 0.000001; // in milliseconds

    setTimeout(() => {
      cartAnimation.style.animationDuration = animationDuration + 'ms';
      cartAnimation.style.left = headerWidth + 'px';
    }, animationDelay);
  }
}
