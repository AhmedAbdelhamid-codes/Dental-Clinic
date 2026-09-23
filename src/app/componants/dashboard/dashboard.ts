import { Component, inject, OnInit } from '@angular/core';
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
export class Dashboard implements OnInit {

staff:Staff | null = null; 

private readonly staffService = inject(StaffService)

ngOnInit(): void {

this.staff = this.staffService.currentStaff

}

}
