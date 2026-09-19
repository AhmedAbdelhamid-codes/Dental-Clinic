import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SlotService } from '../../slot-service';
import { Slots } from '../../slots';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-booking',
  styleUrl: './booking.css',
  templateUrl: './booking.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Booking implements OnInit {
  
soltsData: WritableSignal<Slots[]> = signal([])
groupedSlots = signal(new Map<string, Slots[]>())

  private readonly slotService = inject(SlotService)

  async ngOnInit(){
     this.soltsData.set(await this.slotService.getSlots()) 

    this.groupSlots()
    console.log(this.soltsData())
  }


groupSlots() {
  const grouped = new Map<string, Slots[]>();

  for (const slot of this.soltsData()) {
    if (!grouped.has(slot.date)) {
      grouped.set(slot.date, []);
    }

    grouped.get(slot.date)!.push(slot);
  }

  this.groupedSlots.set(grouped);
}


}
