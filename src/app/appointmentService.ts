import { Injectable } from '@angular/core';
import { AppointmentInsert } from './appointment-insert';
import { supabase } from './core/supabase';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

// book Appointment

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

// get Pending Appointment
  
async getPendingAppointment(status:string){
  
  const {data , error} = await supabase.from('appointments').select("*").eq('status',status)

  if(error){
    console.log(error);
    return []
  }

  return data
}

// update for accepted Appointment

async updateAcceptedAppointment(id:string, price:string|null|undefined){

const {error} = await supabase.from('appointments').update({price, status: 'accepted'}).eq('id',id)

if(error){
  console.log(error)
  return false
}

return true

}

// update for reject Appointment

async updateRejectAppointment(id:string){

const {error} = await supabase.from('appointments').update({status: 'rejected'}).eq('id',id)

if(error){
  console.log(error)
  return false
}

return true

}

}

