import { Injectable } from '@angular/core';
import { AppointmentInsert } from './appointment-insert';
import { supabase } from './core/supabase';

@Injectable({
  providedIn: 'root'
})
export class Appointment {

async bookAppointment(data: AppointmentInsert) {

  const { error } = await supabase.rpc(
    'book_appointment',
    {
      p_patient_name: data.patient_name,
      p_phone: data.phone,
      p_problem: data.problem,
      p_appointment_type: data.appointment_type,
      p_slot_id: data.slot_id
    }
  );

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
}