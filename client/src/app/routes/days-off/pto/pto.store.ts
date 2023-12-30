import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { NewPto, PtoSchedule, initialPtoSchedule } from './data-access/models';
import { PtoHttpService } from './data-access/services/pto-http.service';
import { tap, skip, switchMap, Observable, map } from 'rxjs'
import { DaysOffStore } from '../days-off.store';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { formatDate } from '@angular/common';

export type PtoStoreState = {
    ptoSchedule: PtoSchedule[],
    ptoRemainingHours: number;
}

const initialPtoStoreState: PtoStoreState = {
    ptoSchedule: [],
    ptoRemainingHours: 0,
}

@Injectable()
export class PtoStore extends ComponentStore<PtoStoreState> {

    constructor(
        private readonly http: PtoHttpService,
        private readonly daysOffStore: DaysOffStore,
        private readonly dialogService: DialogService,
        private readonly messageService: MessageService,
        // readonly actionSubject: ActionSubject
    )
    {
        super(initialPtoStoreState)

        // setTimeout(() => {
        //     this.setDefaultPtoSchedule()
        // })
    }

    //SELECTORS
    ptoSchedule$ = this.select(x => x.ptoSchedule);

    selectedYear$ = this.daysOffStore.selectedYear$;

    ptoRemainingHours$ = this.select(
        this.ptoSchedule$,
        (pto) => {
            const p = pto as PtoSchedule[]
            const bdHours = p.map(p => p.burndownHours);
            return Math.min(...bdHours)
        }
    )


    //UPDATERS
    setPtoSchedule = this.updater((state, ptoData: PtoSchedule[]) => {
        console.log('pto schedule', ptoData)
        return {
            ...state,
            ptoSchedule: ptoData
        }
    })

    addPtoSchedule = this.updater((state, pto: PtoSchedule) => {  
        // let newSchedule = this.buildBurndown(state.ptoSchedule.concat(pto));
        return {
            ...state,
            ptoSchedule: this.buildBurndown(state.ptoSchedule.concat(pto)),
        }
    })

    editPtoSchedule = this.updater((state, pto: PtoSchedule) => {  
        
        let sched = state.ptoSchedule;
        let indexToUpdate = sched.findIndex(item => item.ptoScheduleId === pto.ptoScheduleId);
        sched[indexToUpdate] = pto;

        return {
            ...state,
            ptoSchedule: this.buildBurndown(sched),
        }
    })
    


    //EFFECTS
    yearSelectionChange = this.effect(() =>
        this.daysOffStore.selectedYear$.pipe(
            skip(1),
            tap((y: number) => {
                const results = this.http.getPtoScheduleFromYear(y)
                this.setPtoSchedule(results)
            })
        )
    ) 

    editPto = this.effect((pto$: Observable<PtoSchedule>) => 
        pto$.pipe(
           switchMap((pto: PtoSchedule) => {

            const dialog = this.dialogService.open(AddEditModalComponent, {
                data: {
                    pto: pto
                },
                header: `Edit PTO for ${this.convertDateString(new Date(pto.ptoDate))}`,
                width: '30vw',
                contentStyle: { overflow: 'auto' },
                modal: true,
                // templates: {
                //     footer: Footer
                // }
            });            
            
            return dialog.onClose.pipe(
                map((pto: any) => pto)
            );

           }),
           switchMap((pto: any) => {
                if(pto) {
                    this.http.editPto(pto).subscribe(() => {
                            
                        const dayOfWeek = formatDate(pto.ptoDate, 'EEEE', 'en-US').toString()
                        const ptoWithDayOfWeek = {
                            ...pto,
                            dayOfWeek: dayOfWeek
                        } as PtoSchedule

                        return [
                            this.messageService.add({ severity: 'success', summary: 'PTO Updated', detail: pto.reason?? '' }),
                            this.editPtoSchedule(ptoWithDayOfWeek)
                        ]
                    },
                    (err: Error) => {
                        return [
                            this.messageService.add({ severity: 'error', summary: 'PTO Not Saved', detail: err.message?? '' })
                        ] 
                    });      
                }
                    return []
            })
        )
    )

    addPto = this.effect((trigger$) => 
        trigger$.pipe(
           switchMap(() => {

            const dialog = this.dialogService.open(AddEditModalComponent, {
                data: {
                    pto: initialPtoSchedule
                },
                header: `Add New PTO`,
                width: '30vw',
                contentStyle: { overflow: 'auto' },
                modal: true,
            });            
            
            return dialog.onClose.pipe(
                map((pto: any) => pto)
            );

           }),
           switchMap((pto: any) => {
                if(pto) {
                    let newPto: NewPto = {
                        ptoDate: pto.ptoDate,
                        reason: pto.reason,
                        hours: pto.hours,
                        isScheduled: pto.isScheduled,
                        isTaken: pto.isTaken,
                    }

                    this.http.addPto(newPto).subscribe(() => {
                            
                        const dayOfWeek = formatDate(newPto.ptoDate, 'EEEE', 'en-US').toString()
                        const ptoWithDayOfWeek = {
                            ...pto,
                            dayOfWeek: dayOfWeek
                        } as PtoSchedule

                        return [
                            this.messageService.add({ severity: 'success', summary: 'PTO Added', detail: pto.reason?? '' }),
                            this.addPtoSchedule(ptoWithDayOfWeek)
                        ]
                    },
                    (err: Error) => {
                        return [
                            this.messageService.add({ severity: 'error', summary: 'PTO Not Saved', detail: err.message?? '' })
                        ] 
                    });  
                }

                return []
            })
        )
    )

    convertDateString(dt: Date): string {
        // const today = new Date();
        const yyyy = dt.getFullYear();
        let mm = dt.getMonth() + 1; // Months start at 0!
        let dd = dt.getDate();

        if (dd < 10) dd = 0 + dd;
        if (mm < 10) mm = 0 + mm;

        return dd + '/' + mm + '/' + yyyy;
    }


    buildBurndown(pto: PtoSchedule[]) {
        let startingBdHours = pto[0].burndownHours + pto[0].hours;
        return pto.map(p => {
            const hours = startingBdHours - p.hours;
            startingBdHours -= p.hours;
            return {
                ...p,
                burndownHours: hours,
                burndownDays: (hours / 8.0),
            }
        })
    }

    // setDefaultPtoSchedule = this.effect((trigger$) => 
    //     trigger$.pipe(
    //         tap(() => {
    //             const results = this.http.getPtoScheduleFromYear(2023)
    //             this.setPtoSchedule(results)
    //         })
    //     )
    // )


}