import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceResult } from '../../service-result';

@Component({
  selector: 'app-masseges',
  templateUrl: './masseges.html',
  styleUrl: './masseges.css'
})
export class Masseges implements OnChanges {

@Input() messageData!: ServiceResult;
  private readonly cdr = inject(ChangeDetectorRef);

showMessage:boolean = false;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['messageData']) {

      this.showMessage = true;

      setTimeout(() => {
        
        this.showMessage = false;
        this.cdr.detectChanges();
        
        console.log(this.showMessage);
      }, 5000);
    }
  }
}