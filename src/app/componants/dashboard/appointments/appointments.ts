import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AppointmentService } from '../../../appointmentService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsSlect } from '../../../appointments-slect';
import { DatePipe } from '@angular/common';
import { SlotService } from '../../../slot-service';
import { Slots } from '../../../slots';
import { ServiceResult } from '../../../service-result';
import { Masseges } from '../../masseges/masseges';

@Component({
  imports: [ReactiveFormsModule,DatePipe,Masseges],
  selector: 'app-appointments',
  styleUrl: './appointments.css',
  templateUrl: './appointments.html',
  providers: [DatePipe]
})
export class Appointments implements OnInit{

appointments: WritableSignal<AppointmentsSlect[]> = signal([])
slots: WritableSignal<Slots[]> = signal([])
idForShow: string | null = null
idForAccept: string | null = null
showMassege: boolean = false
massegeAppointment = signal<ServiceResult | null>(null);

private readonly appointmentService = inject(AppointmentService)
private readonly slotService = inject(SlotService)
private readonly  datePipe =inject(DatePipe)


async ngOnInit() {

this.appointments.set(await this.appointmentService.getPendingAppointment('pending'))
this.slots.set(await this.slotService.getAllSlots())

 console.log(this.appointments());
}


priceAppointment = new FormGroup({
  price: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/)])
})

getAppointmentTypeLabel(type:string): string{

 const labels: Record<string, string> = {
      new: 'كشف جديد',
      follow_up: 'متابعة كشف',
      pending: 'في الانتظار',
      accepted: 'مقبول'
    };

    return labels[type] ?? type;
}

showAcceptBtn(appointment:AppointmentsSlect){
this.idForShow = appointment.id
}

openWhatsApp(phone:string, message:string ){

  const internationalPhone = "20" + phone.substring(1)

  const url = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`

  window.open(url,"_blank")
}


async acceptAppointment(appointment:AppointmentsSlect,slot:Slots){

  this.idForAccept = appointment.id
   
  if(this.priceAppointment.invalid){
    return
  }

  const result = await this.appointmentService.updateAcceptedAppointment(appointment.id,this.priceAppointment.value.price)

  if(result === false){
    this.massegeAppointment.set({
      success: false,
      message: "حدث خطا اثناء القبول يرجى اعادة المحاولة...اول تواصل مع المطور"
    })
    return
  }

  const date =  this.datePipe.transform(slot.date + 'T' + slot.time,'EEEE,d MMMM y — h:mm a')


   const message:string = `اهلا يا ${appointment.patient_name}, تم تأكيد حجزك بنجاح , سعداء بانك حجزت معنا موعدك الاساسي يوم ${date} سعر الكشف هو ${this.priceAppointment.value.price} شكرا لوقتك ونتمنى لكم الشفاء
   ادارة عيادة دكتور مصطفي محمد سيد
   `
  this.openWhatsApp(appointment.phone,message);

  await this.slotService.deleteSlot(slot.id)
  
  this.appointments.set(await this.appointmentService.getPendingAppointment('pending'))
  this.slots.set(await this.slotService.getAllSlots())

}

async rejectAppointment(appointment:AppointmentsSlect,slot:Slots){

const result = await this.appointmentService.updateRejectAppointment(appointment.id)


if(result === false){
    this.massegeAppointment.set({
      success: false,
      message: "حدث خطا اثناء الرفض يرجى اعادة المحاولة...اول تواصل مع المطور"
    })
    return
  }

  const date =  this.datePipe.transform(slot.date + 'T' + slot.time,'EEEE,d MMMM y — h:mm a')
  const message:string = `اهلا يا ${appointment.patient_name}, نعتذر تم رفض حجزك..لم يعد الدكتور متاحا في هذا الموعد برجاء اختيار موعد اخر , سعداء بانك حجزت معنا موعدك الاساسي يوم ${date} شكرا لوقتك ونتمنى لكم الشفاء
   ادارة عيادة دكتور مصطفي محمد سيد
   `
  this.openWhatsApp(appointment.phone,message);

  await this.slotService.deleteSlot(slot.id)

  this.appointments.set(await this.appointmentService.getPendingAppointment('pending'))
  this.slots.set(await this.slotService.getAllSlots())

}


}
