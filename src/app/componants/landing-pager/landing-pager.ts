import { Component } from '@angular/core';
import { Home } from '../home/home';
import { About } from '../about/about';
import { Services } from '../services/services';
import { Booking } from '../booking/booking';

@Component({
  imports: [Home, About, Services, Booking],
  selector: 'app-landing-pager',
  styleUrl: './landing-pager.css',
  templateUrl: './landing-pager.html',
})
export class LandingPager {}
