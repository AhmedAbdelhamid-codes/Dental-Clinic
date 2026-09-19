import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

scrolled:boolean = false

@HostListener("window:scroll")
scroll():void{
    if(window.scrollY >= 20){
       this.scrolled = true
    }else{
      this.scrolled = false
    }
}
}
