import { Injectable } from '@angular/core';
import { supabase } from './core/supabase';
import { Staff } from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

currentStaff:Staff | null = null

async getStaffById(id: string) {
    
  const {data, error} = await supabase.from("staff").select("*").eq('id',id).single()
        

  this.currentStaff = data
}

}
