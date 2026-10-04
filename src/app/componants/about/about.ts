import { Component } from '@angular/core';
import { Animat } from '../../animat';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Animat,TranslatePipe],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {

 dir:string = document.documentElement.dir 
  
}
