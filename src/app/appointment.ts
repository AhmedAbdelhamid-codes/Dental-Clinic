import { Injectable } from '@angular/core';
import { AppointmentInsert } from './appointment-insert';
import { supabase } from './core/supabase';

@Injectable({
  providedIn: 'root'
})
export class Appointment {

async createAppointment(data:AppointmentInsert){

const {error} = await supabase.from('appointments').insert(data)

if(error){
    console.log(error)
    return false
}else{
    return true
}

}
}
