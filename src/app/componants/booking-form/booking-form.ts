import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup, Validators} from '@angular/forms';
import { Slots } from '../../slots';
import { DatePipe } from '@angular/common';
import { AppointmentInsert } from '../../appointment-insert';


@Component({
  imports: [ReactiveFormsModule,DatePipe],
  selector: 'app-booking-form',
  styleUrl: './booking-form.css',
  templateUrl: './booking-form.html',
})
export class BookingForm {
submitted:boolean = false;

@Input() selectedSlot!:Slots | null
@Output() closeform = new EventEmitter<void>()
@Output() submitForm = new EventEmitter<AppointmentInsert>()

close(){
this.closeform.emit()
}

bookingForm = new FormGroup({
  name: new FormControl('',[Validators.minLength(3),Validators.required]),
  phone: new FormControl('',[Validators.required,Validators.pattern(/^01[0,1,2,5][0-9]{8}$/)]),
  problem: new FormControl('',[Validators.required,Validators.minLength(5)]),
  appointment_type: new FormControl('',Validators.required)
});

submitBooking(){
  this.submitted = true;

  if (this.bookingForm.invalid) {
    return;
  }

  const appointmentData:AppointmentInsert = {
    patient_name : this.bookingForm.value.name!,
    phone : this.bookingForm.value.phone!,
    problem : this.bookingForm.value.problem!,
    appointment_type : this.bookingForm.value.appointment_type!,
    slot_id : this.selectedSlot?.id!
  }

console.log(appointmentData);
  this.submitForm.emit(appointmentData)
  this.closeform.emit()
}
}
