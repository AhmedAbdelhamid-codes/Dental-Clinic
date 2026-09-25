import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SlotService } from '../../slot-service';
import { Slots } from '../../slots';
import { DatePipe } from '@angular/common';
import { BookingForm } from '../booking-form/booking-form';
import { AppointmentInsert } from '../../appointment-insert';
import { Appointment } from '../../appointment';
import { ServiceResult } from '../../service-result';
import { Masseges } from '../masseges/masseges';

@Component({
  imports: [DatePipe, BookingForm,Masseges],
  selector: 'app-booking',
  styleUrl: './booking.css',
  templateUrl: './booking.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Booking implements OnInit {
  
soltsData: WritableSignal<Slots[]> = signal([])
groupedSlots = signal(new Map<string, Slots[]>())
showForm:boolean = false;
selectedSlot: Slots | null = null
massegeappoinmernt = signal<ServiceResult | null>(null);
showMassge:boolean= false

private readonly slotService = inject(SlotService)
private readonly appointment = inject(Appointment)

async ngOnInit(){
  this.soltsData.set(await this.slotService.getAvailableSlots("available")) 

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

openFormAppointment(slot:Slots){
this.showForm = true;
this.selectedSlot = slot
}

async handleBooking(Data:AppointmentInsert){
const result = await this.appointment.bookAppointment(Data)

if (result) {
  this.soltsData.set(await this.slotService.getAvailableSlots("available")) 

  this.groupSlots()

  this.massegeappoinmernt.set({
    success: true,
    message: "تم إرسال طلب الحجز - سيتواصل معك فريق العيادة لتأكيد الموعد"
  });
} else {
  this.massegeappoinmernt.set({
    success: false,
    message: "حدث خطأ ولم يتم تأكيد الحجز"
  });
}

this.showMassge =true

console.log(this.massegeappoinmernt)
}
}
