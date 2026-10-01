import { Injectable } from '@angular/core';
import { supabase } from './core/supabase';
import { Staff } from './staff';
import { StaffInsert } from './staff-insert';
import { json } from 'express';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class StaffService {


currentStaff: Staff | null = null;
private staffPromise: Promise<void> | null = null;

async getStaffById(id: string) {
  this.staffPromise = this.loadStaff(id);
  await this.staffPromise;
}

private async loadStaff(id: string) {
  const { data, error } = await supabase.from('staff').select('*').eq('id', id).single();

  if (!error) {
    this.currentStaff = data;
  }
}

async waitForStaff() {
  if (this.staffPromise) {
    await this.staffPromise;
  }
}


async createStaff(staffData:StaffInsert){
const {data, error} = await supabase.functions.invoke(
   'create-staff',
    {
      body: staffData
    }
)


if(error){
  console.log(error)
  return false
}

return data
}


async getStaff(){
const {data,error} = await supabase.from('staff').select('*');

if(error){
  console.log(error);
  return []
}

return data
}
}
