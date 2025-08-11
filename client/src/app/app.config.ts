import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from "./app.routes";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";
import { schedulerReducers } from "./scheduler/data-access/store/scheduler.reducer";
import { TimeTrackingEffects } from "./scheduler/data-access/store/time-tracking/time-tracking.effects";
import { AddHeaderInterceptor } from "./shared/services/interception";


export const appConfig: ApplicationConfig = {
  providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddHeaderInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withHashLocation()), 
        provideAnimations(), 
        provideStore(schedulerReducers),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
          }),
        provideEffects([
            TimeTrackingEffects,
        ])
    ]
};