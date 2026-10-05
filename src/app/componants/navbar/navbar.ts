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
  const savedLang = localStorage.getItem('lang') || 'ar';
  this.translate.use(savedLang);

  document.documentElement.lang = savedLang;
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';

  const bootstrapStyle = document.getElementById('bootstrap-style') as HTMLLinkElement;
  
  if (bootstrapStyle) {
    bootstrapStyle.href = savedLang === 'ar' ? 'bootstrap-rtl.css' : 'bootstrap-ltr.css';
  }
}

changeLang(){
  const newLang = this.translate.currentLang();
  const nextLang = newLang === 'en' ? 'ar' : 'en';

  this.translate.use(nextLang);
  
  localStorage.setItem('lang', nextLang);

  document.documentElement.lang = nextLang;
  document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';

  const bootstrapStyle = document.getElementById('bootstrap-style') as HTMLLinkElement;
  bootstrapStyle.href = nextLang === 'ar' ? 'bootstrap-rtl.css' : 'bootstrap-ltr.css';
}


}
