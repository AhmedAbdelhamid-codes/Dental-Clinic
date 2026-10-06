import { Routes } from '@angular/router';
import { doctorguardGuard } from './doctorguard-guard';
import { Public } from './componants/public/public';
import { authGuardGuard } from './auth-guard-guard';

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
              title:'hero.titleTab',
              loadComponent: () =>
                import("./componants/landing-pager/landing-pager")
                  .then((c) => c.LandingPager)
            },
            {
              path:"about",
              title:'about.titleTab',
              loadComponent: () =>
                import("./componants/about/about")
                  .then((c) => c.About)
           },
           {
              path:"services",
              title:'services.titleTab',
              loadComponent: () =>
                import("./componants/services/services")
                  .then((c) => c.Services)
            },
            {
              path:"booking",
              title:'booking.titleTab',
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
        canActivateChild: [authGuardGuard],
        children: [
          {
             path:"",
             redirectTo:"dashboardHome",
             pathMatch:"full"
          },
          {
            path: "dashboardHome",
            title:"لوحة تحكم الطاقم الطبي",
            loadComponent: () =>
             import('./componants/dashboard/dashboard-home/dashboard-home')
              .then(c => c.DashboardHome)
          },
          {
            path: "slots",
            title:"المواعيد المتاحة",
            loadComponent: () =>
             import('./componants/dashboard/slotscom/slotscom')
              .then(c => c.Slotscom)
          },
          {
            path: "appointments",
            title:"الحجوزات المتاحة",
            loadComponent: () =>
             import('./componants/dashboard/appointments/appointments')
              .then(c => c.Appointments)
          },
          {
            path: "addStaff",
            title:"ادارة الطاقم",
            loadComponent: () =>
             import('./componants/dashboard/add-staff/add-staff')
              .then(c => c.AddStaff),
             canActivate: [doctorguardGuard]
          }
        ]
    }
];
