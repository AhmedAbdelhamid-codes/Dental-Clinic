import { Injectable } from '@angular/core';
import { supabase } from './core/supabase';
import { Slotinsert } from './slotinsert';
import { UpdateSlot } from './update-slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

// slectAvailableSlots

async getAvailableSlots(status:string){

const {data, error} = await supabase.from("appointment_slots").select("*").eq("status",status)


if(error){
  console.log(error)
  return []
}

return data

}

// slectAllSlots
async getAllSlots(){
  const {data , error } = await supabase.from("appointment_slots").select("*")
      
 if (error) { 
    console.log(error)
   return [];
  }

return data;
}

// Insert
async postSlots(slotsData:Slotinsert){
   const {data , error} = await supabase.from("appointment_slots").insert(slotsData)

  if (error) {
    console.log(error);
    return false;
  }

  return data;
}

// update

async putslots(slotData:UpdateSlot){

const {error} = await supabase.from("appointment_slots").update(slotData).eq('id',slotData.id)

if(error){
  console.log(error)
  return false
}

return true

}

// delet

async deleteSlot(id: number) {
  const { error } = await supabase.from('appointment_slots').delete().eq('id', id);

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}

}