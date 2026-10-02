import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appAnimat]',
})
export class Animat implements OnInit, OnDestroy {

private readonly elementRef = inject(ElementRef);
private observer?: IntersectionObserver;
index:number = 0

@Input() appAnimat = '';

ngOnInit(): void {

  this.observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting){
        const element = entry.target as HTMLElement;

        if (this.appAnimat === 'left' || this.appAnimat === 'right') {

          element.classList.add('show');

          this.observer?.unobserve(element);
        }

        if (this.appAnimat === "card") {

               let columns;

              if (window.innerWidth >= 992) {
                    columns = 3;
              } else if (window.innerWidth >= 768) {
                    columns = 2;
              }
              else {
                    columns = 1;
              }

              let indexInRow = this.index % columns;

              console.log('card detected', this.index);

              element.style.animation
                = `fadeup 0.8s ${indexInRow * 0.1}s ease both`

             this.observer?.unobserve(element);
        }
        };
      });

    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}