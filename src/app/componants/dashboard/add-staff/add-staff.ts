import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffService } from '../../../staff-service';
import { Staff } from '../../../staff';
import { ServiceResult } from '../../../service-result';
import { StaffInsert } from '../../../staff-insert';
import { Masseges } from '../../masseges/masseges';

@Component({
  imports: [ReactiveFormsModule, Masseges],
  selector: 'app-add-staff',
  styleUrl: './add-staff.css',
  templateUrl: './add-staff.html',
})
export class AddStaff implements OnInit {

type:string = "password";
showOrNo:string = "d-none"
hideOrNo:string = "d-block"
submitted:boolean = false
staff: WritableSignal<Staff[]> = signal([])
massegeStaff = signal<ServiceResult | null>(null);
showMassege: boolean = false

private readonly staffService = inject(StaffService)

async ngOnInit(){
  this.staff.set(await this.staffService.getStaff())
  console.log(this.staff())
}

togglePass(){
  this.type = this.type === "password"? 'text' : "password";
}

showAddForm(){
this.showOrNo = this.showOrNo === 'd-none'? "d-block" : "d-none"
this.hideOrNo = this.hideOrNo === 'd-block'? "d-none" : "d-block"
}

closeAddForm(){
  this.hideOrNo = this.hideOrNo === 'd-block'? "d-none" : "d-block"
  this.showOrNo = this.showOrNo === 'd-none'? "d-block" : "d-none"
}

addStaffForm = new FormGroup({
  name: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$')]),
  password: new FormControl('',[Validators.required]),
  tittle: new FormControl('',[Validators.required]),
  role: new FormControl('selected',[Validators.required])
})


async submitForm(){

this.submitted = true

if(this.addStaffForm.invalid){
  return
}

const staffDetails:StaffInsert ={
  email: this.addStaffForm.value.email!,
  password: this.addStaffForm.value.password!,
  name:this.addStaffForm.value.name!,
  role:this.addStaffForm.value.role!,
  tittle: this.addStaffForm.value.tittle!,
}

const result = await this.staffService.createStaff(staffDetails)

if(result === false){
this.massegeStaff.set(
{
  success: false,
  message: "حدث خطأ اثناء اضافة عضو برجاء اعادة المحاولة او التواصل مع المطور"
}) 

this.showMassege = true
console.log(result)

return
}

this.massegeStaff.set(
{
  success: true,
  message: "تم اضافة العضو بنجاح"
}) 

this.showMassege = true

console.log(result)

this.staff.set(await this.staffService.getStaff())

}

getStaffTypeLabel(type:string): string{

 const labels: Record<string, string> = {
      doctor: 'طبيب',
      assistant: 'مساعد طبيب',
    };

    return labels[type] ?? type;
}


}
