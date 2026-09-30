import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Staff } from '../../../staff';
import { StaffService } from '../../../staff-service';
import { SlotService } from '../../../slot-service';
import { AppointmentService } from '../../../appointmentService';
import { AppointmentsSlect } from '../../../appointments-slect';
import { Slots } from '../../../slots';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  imports: [RouterLink,DatePipe],
  selector: 'app-dashboard-home',
  styleUrl: './dashboard-home.css',
  templateUrl: './dashboard-home.html',
})
export class DashboardHome implements OnInit {

staff:Staff | null = null; 
name!:string | undefined;
appointments: WritableSignal<AppointmentsSlect[]> = signal([])
lastAppointments:WritableSignal<AppointmentsSlect[]> = signal([])
slots: WritableSignal<Slots[]> = signal([])
availableSlots: WritableSignal<Slots[]> = signal([])
patient!:number

private readonly staffService = inject(StaffService)
private readonly slotService = inject(SlotService)
private readonly appointmentService = inject(AppointmentService)

async ngOnInit(){
this.staff =  this.staffService.currentStaff
this.name = this.staff?.name.split(' ')[0]
this.appointments.set(await this.appointmentService.getAllAppointment())
this.slots.set(await this.slotService.getAllSlots())
this.patient = new Set(this.appointments().map((appointment) => appointment.phone)).size
this.availableSlots.set(this.slots().filter((slot) => slot.status === 'available'))
this.lastAppointments.set(await this.appointmentService.getlastAppointment())  
console.log(this.availableSlots())
}


getAppointmentTypeLabel(type:string): string{

 const labels: Record<string, string> = {
      new: 'كشف جديد',
      follow_up: 'متابعة كشف',
      pending: 'في الانتظار',
      accepted: 'مقبول',
      rejected : 'مرفوض'
    };

    return labels[type] ?? type;
}

}
