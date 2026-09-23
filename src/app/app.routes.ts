import { Routes } from '@angular/router';
import { Public } from './componants/public/public';

export const routes: Routes = [
    {
        path: "",
        component:Public,
        children: [
            {
             path:"",
             redirectTo:"home",
             pathMatch:"full"
            },
            {
              path:"home",
              title:"عيادة الدكتور مصطفي محمد سيد",
              loadComponent: () =>
                import("./componants/landing-pager/landing-pager")
                  .then((c) => c.LandingPager)
            },
            {
              path:"about",
              title:"عن الدكتور مصطفي محمد سيد",
              loadComponent: () =>
                import("./componants/about/about")
                  .then((c) => c.About)
           },
           {
              path:"services",
              title:"خدامات عيادة الدكتور مصطفي محمد سيد",
              loadComponent: () =>
                import("./componants/services/services")
                  .then((c) => c.Services)
            },
            {
              path:"booking",
              title:"حجز المواعيد",
              loadComponent: () =>
                import("./componants/booking/booking")
                  .then((c) => c.Booking)
            }
        ]
    },
    {
        path: "login",
        title:"تسجيل دخول الطاقم الطبي",
        loadComponent: () =>
        import('./componants/login/login')
        .then(c => c.Login)
    },
    {
        path: "dashboard",
        title:"لوحة تحكم الطاقم الطبي",
        loadComponent: () =>
        import('./componants/dashboard/dashboard')
        .then(c => c.Dashboard),
        children: [
          {
            path: "slots",
            loadComponent: () =>
             import('./componants/dashboard/slotscom/slotscom')
              .then(c => c.Slotscom)
          }
        ]
    }
];
