import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginData } from '../../login-data';
import { AuthService } from '../../auth-service';
import { ServiceResult } from '../../service-result';
import { StaffService } from '../../staff-service';
import { Masseges } from '../masseges/masseges';

@Component({
  imports: [ReactiveFormsModule, RouterLink,Masseges],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit{

submited:boolean = false
showMassege:boolean = false
massegeresult!:ServiceResult
showRelode = signal<boolean>(false)

private readonly authService = inject(AuthService)
private readonly router = inject(Router)
private readonly staffService = inject(StaffService)


ngOnInit(): void {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    const bootstrapStyle = document.getElementById('bootstrap-style') as HTMLLinkElement;
    if (bootstrapStyle) bootstrapStyle.href = 'bootstrap-rtl.css';
}

loginForm = new FormGroup({
  Email: new FormControl('',[Validators.required]),
  Password: new FormControl('',[Validators.required])
})

async submitForm(){

this.submited = true

if(this.loginForm.invalid){
  return;
}

this.showRelode.set(true)
 
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
  this.showRelode.set(false)
  return;
}

await this.staffService.getStaffById(result.user.id);

this.router.navigate(["/dashboard"]);
}
}
