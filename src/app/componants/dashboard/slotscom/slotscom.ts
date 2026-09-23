import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlotService } from '../../../slot-service';
import { Slots } from '../../../slots';
import { DatePipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule,DatePipe],
  selector: 'app-slotscom',
  styleUrl: './slotscom.css',
  templateUrl: './slotscom.html',
})
export class Slotscom implements OnInit{

slots: WritableSignal<Slots[]> = signal([])

private readonly slotService = inject(SlotService)

addslot = new FormGroup({
  date : new FormControl('',Validators.required),
  time : new FormControl('',Validators.required)
})

async ngOnInit() {
  this.slots.set(await this.slotService.getSlots()) 
  console.log(this.slots())
}

}
