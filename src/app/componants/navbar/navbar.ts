import { Component, HostListener, inject, OnInit,signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {

scrolled:boolean = false

private translate = inject(TranslateService);

@HostListener("window:scroll")
scroll():void{
    if(window.scrollY >= 20){
       this.scrolled = true
    }else{
      this.scrolled = false
    }
}

ngOnInit(): void {
  this.translate.use('ar')
}

changeLang(){

const newLang = this.translate.currentLang()

this.translate.use(newLang === 'en'? 'ar' : 'en')

  document.documentElement.lang = newLang === 'ar' ? 'en' : 'ar';
  document.documentElement.dir = newLang === 'ar' ? 'ltr' : 'rtl';

  const bootstrapStyle = document.getElementById('bootstrap-style') as HTMLLinkElement;

  bootstrapStyle.href =
    newLang === 'ar'? 'bootstrap-ltr.css' : 'bootstrap-rtl.css';
}


}
