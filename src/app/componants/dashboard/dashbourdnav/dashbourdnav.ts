import { Component, inject, Input } from '@angular/core';
import { Staff } from '../../../staff';
import { AuthService } from '../../../auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-dashbourdnav',
  styleUrl: './dashbourdnav.css',
  templateUrl: './dashbourdnav.html',
})
export class Dashbourdnav {

@Input() staff!:Staff

private readonly authService = inject(AuthService)
private readonly router = inject(Router)

async logout(){
  await this.authService.logout();
  this.router.navigate(["/home"])
}

}