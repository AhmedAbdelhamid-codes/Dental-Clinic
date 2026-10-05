import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StaffService } from '../../staff-service';
import { Staff } from '../../staff';
import { Dashbourdnav } from './dashbourdnav/dashbourdnav';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Dashbourdnav, RouterOutlet],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit, OnDestroy {

  staff: Staff | null = null;

  private readonly staffService = inject(StaffService);

ngOnInit(): void {
  this.staff = this.staffService.currentStaff;
}

ngOnDestroy(): void {
  const savedLang = localStorage.getItem('lang') || 'ar';
  document.documentElement.lang = savedLang;
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  const bootstrapStyle = document.getElementById('bootstrap-style') as HTMLLinkElement;
  if (bootstrapStyle) bootstrapStyle.href = savedLang === 'ar' ? 'bootstrap-rtl.css' : 'bootstrap-ltr.css';
}

}
