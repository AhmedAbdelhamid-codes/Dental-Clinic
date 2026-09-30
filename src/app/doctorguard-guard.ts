import { inject } from '@angular/core';
import { StaffService } from './staff-service';
import { CanActivateFn } from '@angular/router';

export const doctorguardGuard: CanActivateFn = async () => {
  
  const staffService = inject(StaffService);

  await staffService.waitForStaff();

  return staffService.currentStaff?.role === 'doctor';
};