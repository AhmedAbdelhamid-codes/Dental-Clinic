import { Component, ElementRef, inject, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SlotService } from '../../../slot-service';
import { Slots } from '../../../slots';
import { DatePipe } from '@angular/common';
import { Slotinsert } from '../../../slotinsert';
import { Masseges } from '../../masseges/masseges';
import { ServiceResult } from '../../../service-result';
import { UpdateSlot } from '../../../update-slot';

@Component({
  imports: [ReactiveFormsModule, DatePipe, Masseges],
  selector: 'app-slotscom',
  styleUrl: './slotscom.css',
  templateUrl: './slotscom.html',
})
export class Slotscom implements OnInit{

slots: WritableSignal<Slots[]> = signal([])
massegeSlot = signal<ServiceResult | null>(null);
showMassege: boolean = false
editingSlotId: WritableSignal<number | null> = signal(8)
isDeleting = signal<boolean>(false);

private readonly slotService = inject(SlotService)

addSlot = new FormGroup({
  date : new FormControl('',Validators.required),
  time : new FormControl('',Validators.required)
})

updateslot = new FormGroup({
  date : new FormControl('',Validators.required),
  time : new FormControl('',Validators.required)
})

async ngOnInit() {
  this.slots.set(await this.slotService.getSlots()) 
  console.log(this.slots())
}

async addSlotsSubmit(){

  if(this.addSlot.invalid){
    return
  }

  const slotData:Slotinsert = {
    date: this.addSlot.value.date!,
    time:this.addSlot.value.time!
  }


  const result = await this.slotService.postSlots(slotData);

 if(result === false){
    this.massegeSlot.set({
      success: false,
      message: "حدث خطأ اثناء اضافة الموعد بالرجاء المحاولة مره اخري"
    })
    this.showMassege = true;
    return;
  }

   this.massegeSlot.set({
      success: true,
      message: "تمت اضافة الموعد بنجاح"
    })

    this.showMassege = true


    this.slots.set(await this.slotService.getSlots()) 
}

showFormUpdate(slot:Slots){
this.editingSlotId.set(slot.id);

this.updateslot.patchValue({
  date : slot.date,
  time : slot.time,
})

}

async updateSoltsSubmit(slot:Slots){

if(this.updateslot.invalid){
  return
}

this.editingSlotId.set(null);


const updatData:UpdateSlot = {
  date: this.updateslot.value.date!,
  time:this.updateslot.value.time!,
  id : slot.id
}

const result = await this.slotService.putslots(updatData)

if(result === false){
  this.massegeSlot.set({
    success: false,
    message: "حدث خطأ اثناء تعديل هذا الموعد برجاء اعادة المحاولة "
  })
  this.showMassege = true
  return;
}

this.massegeSlot.set({
    success: true,
    message: "تم تعديل الموعد بنجاح"
})

this.showMassege = true

this.slots.update(slots =>
   slots.map(slot2 => 
      slot2.id === slot.id?  {
        ...slot,
        date: this.updateslot.value.date!,
        time: this.updateslot.value.time!
      } :  slot
   )
)

}

closeFormUdate(){
this.editingSlotId.set(null);
}

async deleteSlot(id: number) {
  this.isDeleting.set(true)

  const result = await this.slotService.deleteSlot(id);

  if (result === false) {
    this.massegeSlot.set({
      success: false,
      message: 'حدث خطأ أثناء حذف الموعد برجاء إعادة المحاولة'
    });

    this.showMassege = true;
    this.isDeleting.set(false)
    return;
  }

  this.massegeSlot.set({
    success: true,
    message: 'تم حذف الموعد بنجاح'
  });

  this.showMassege = true;

  this.slots.set(await this.slotService.getSlots())

  setTimeout(() =>{
    this.isDeleting.set(false)
  },5000)
}

}
