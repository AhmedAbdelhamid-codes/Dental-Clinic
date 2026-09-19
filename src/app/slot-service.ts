import { Injectable } from '@angular/core';
import { supabase } from './core/supabase';

@Injectable({
  providedIn: 'root'
})
export class SlotService {


async getSlots(){
  const {data , error } = await supabase.from("appointment_slots").select("*")
      
 if (error) { 
    console.log(error)
   return [];
  }

return data;
}

}