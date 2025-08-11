import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LocalStorageService } from "../../services/local-storage.service";
import {  timeTrackingActions } from ".";
import { tap } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable()
export class TimeTrackingEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        // private localStorageService: LocalStorageService,
    ) {}

    // getSelectedDate$

    // setSelectedDate$ =  createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(timeTrackingActions.setSelectedDate),
    //         // withLatestFrom(this.store.select(fromTimeTracking.selectedDate)),
    //         tap((a) => this.localStorageService.setItem('SelectedTimeTrackingDate', a.selectedDate.toDateString())
    //         )
    //     )
    // )

}