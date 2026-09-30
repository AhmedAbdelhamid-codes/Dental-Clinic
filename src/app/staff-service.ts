import { Injectable } from '@angular/core';
import { supabase } from './core/supabase';
import { Staff } from './staff';

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
}
