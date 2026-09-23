import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginData } from '../../login-data';
import { AuthService } from '../../auth-service';
import { Masseges } from '../masseges/masseges';
import { ServiceResult } from '../../service-result';
import { StaffService } from '../../staff-service';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  imports: [ReactiveFormsModule, RouterLink, Masseges],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

submited:boolean = false
showMassege:boolean = false
massegeresult:ServiceResult | null = null

private readonly authService = inject(AuthService)
private readonly router = inject(Router)
private readonly staffService = inject(StaffService)


loginForm = new FormGroup({
  Email: new FormControl('',[Validators.required]),
  Password: new FormControl('',[Validators.required])
})


async submitForm(){
  this.submited = true

  if(this.loginForm.invalid){
    return;
  }

  const loginData:LoginData = {
     email: this.loginForm.value.Email!,
     password: this.loginForm.value.Password!
  }

 const result = await this.authService.login(loginData);

if (result === false) {
  this.massegeresult = {
    success: false,
    message: "حدث خطأ أثناء تسجيل الدخول، برجاء إعادة المحاولة"
  };

  this.showMassege = true;
  return;
}

this.massegeresult = {
  success: true,
  message: "تم تسجيل الدخول بنجاح"
};

this.showMassege = true;

await this.staffService.getStaffById(result.user.id);

this.router.navigate(["/dashboard"]);
}


}
