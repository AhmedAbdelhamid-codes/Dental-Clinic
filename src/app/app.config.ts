import { ApplicationConfig, provideBrowserGlobalErrorListeners,LOCALE_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

registerLocaleData(ar);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration: "top"}),withViewTransitions()), 
    provideClientHydration(),
    {
      provide: LOCALE_ID,
      useValue: 'ar-EG'
    }
  ]
};
