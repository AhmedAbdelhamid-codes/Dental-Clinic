import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  imports: [Navbar, RouterOutlet, Footer],
  selector: 'app-public',
  styleUrl: './public.css',
  templateUrl: './public.html',
})
export class Public {}
