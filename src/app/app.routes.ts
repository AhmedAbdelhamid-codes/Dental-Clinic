import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
