import { AfterViewInit, Component, QueryList, ViewChildren,} from '@angular/core';
import { Animat } from '../../animat';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Animat,TranslatePipe],
  selector: 'app-services',
  styleUrl: './services.css',
  templateUrl: './services.html',
})
export class Services implements AfterViewInit {

@ViewChildren(Animat) cards!:QueryList<Animat>;

ngAfterViewInit(): void {
  this.cards.forEach((card, index) => {
    card.index = index;
  });
}


}
