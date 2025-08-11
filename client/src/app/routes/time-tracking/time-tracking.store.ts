import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { ActionsSubject, Store } from "@ngrx/store";
import { Observable, tap, withLatestFrom } from "rxjs";
import { LocalStorageService } from "src/app/scheduler/data-access/services/local-storage.service";
import { dateNotSet, fromTimeTracking, timeTrackingActions } from "src/app/scheduler/data-access/store/time-tracking";

export type TimeTrackingState = {
    datesForSelectedWeek: Date[];
}

export const initialTimeTrackingState = {
    datesForSelectedWeek: [],
}

@Injectable()
export class TimeTrackingComponentStore extends ComponentStore<TimeTrackingState> {

    constructor(
        private readonly store: Store,
        private readonly actionSubject: ActionsSubject,
        private localStorageService: LocalStorageService,
    )
    {
        super(initialTimeTrackingState)

        setTimeout(() => {
            this.setSelectedDateOnConstruction()
        })
    }

    //SELECTORS
    selectedDate$ = this.select(
        this.store.select(fromTimeTracking.selectedDate),
        (dt) => {
            console.log('selectedDate$', dt)
            return dt;
        }
    )

    datesForSelectedWeek$ = this.select(x => x.datesForSelectedWeek)

    //UPDATERS
    setDatesForSelectedWeek = this.updater((state, dates: Date[]) => {
        return {
            ...state,
            datesForSelectedWeek: dates,
        }
    })


    //EFFECTS
    syncDatesForSelectedWeek = this.effect(() =>
        this.actionSubject.pipe(
            ofType(timeTrackingActions.setSelectedDate),
            tap((a) => {
                this.setDatesForSelectedWeek(this.dates(a.selectedDate))
            })
        )
    )

    setSelectedDateOnConstruction = this.effect((trigger$) =>
        trigger$.pipe(
            concatLatestFrom(() => [
                this.store.select(fromTimeTracking.selectedDate)
            ]),
            tap(([, dt]) => {
                if(dt === null || dt === dateNotSet) {
                    //check local storage
                    //for now just use today's date
                    const localStorageDate = new Date(this.localStorageService.getItem('SelectedTimeTrackingDate')?? new Date('04-02-2024'))
                    
                    this.store.dispatch(timeTrackingActions.setSelectedDate({ selectedDate: localStorageDate }))
                    // this.updateSelectedDate(localStorageDate)
                }
            })
        )
    )


    updateSelectedDate = this.effect((sel$: Observable<Date>) =>
        sel$.pipe(
            tap(sel => {    
                const dt: Date = new Date(JSON.parse(JSON.stringify(sel)));
                // const settingDt: Date = new Date(JSON.parse(JSON.stringify(sel)));
                // this.currentDateSelection = sel;
                // this.timeEntryForm.controls['date'].patchValue(sel);
                this.store.dispatch(timeTrackingActions.setSelectedDate({ selectedDate: sel }))
                
                this.localStorageService.setItem('SelectedTimeTrackingDate', sel.toDateString())
                this.setDatesForSelectedWeek(this.dates(dt));
            })
        )        
    )
    
    dates(selectedDate: Date) {
        var week= new Array(); 
        // Starting Monday not Sunday
        let adjustedDate: Date = new Date(JSON.parse(JSON.stringify(selectedDate)));;
        adjustedDate.setDate((adjustedDate.getDate() - adjustedDate.getDay() +1))

        // console.log('1 - selectedDate', selectedDate, 'adjustedDate', adjustedDate, 'current selected', this.currentDateSelection)

        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(adjustedDate)
            ); 
            adjustedDate.setDate(adjustedDate.getDate() +1);
        }
        // console.log('2 - selectedDate', selectedDate, 'adjustedDate', adjustedDate, 'current selected', this.currentDateSelection)
        return week; 
    }
}