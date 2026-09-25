import { Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth-service';
import { LodingPage } from './componants/loding-page/loding-page';
import { Masseges } from './componants/masseges/masseges';
import { ServiceResult } from './service-result';
import { StaffService } from './staff-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LodingPage,Masseges],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

isLoading = signal<boolean>(true)
showMassege:boolean = false
massegeSession = signal<ServiceResult | null>(null);

private readonly authService = inject(AuthService)
private readonly staffService = inject(StaffService)

async ngOnInit() {

  const session = await this.authService.getSession();

  if (session === false) {
    this.massegeSession.set({
      success: false,
      message: "حدث خطا اثناء تسجيل الدخول برجاء اعادة المحاولة"
    })
    this.showMassege = true
    this.isLoading.set(false)
  } 
  else if (session === null) {
    setTimeout(() =>{
      this.isLoading.set(false)
    },3000)
  } 
  else {
    await this.staffService.getStaffById(session.user.id);
    this.isLoading.set(false)
  }

}


}


