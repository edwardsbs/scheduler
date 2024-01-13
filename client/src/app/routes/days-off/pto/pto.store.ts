import { NewPto, NewPtoAnnual, PtoAnnual, PtoSchedule, initialPtoSchedule  } from './data-access/models/index';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PtoHttpService } from './data-access/services/pto-http.service';
import { tap, skip, switchMap, Observable, map, withLatestFrom } from 'rxjs'
import { DaysOffStore } from '../days-off.store';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddEditPtoModalComponent } from './add-edit-pto-modal/add-edit-pto-modal.component';
import { formatDate } from '@angular/common';
import { AddEditAnnualModalComponent } from './add-edit-annual-modal/add-edit-annual-modal.component';
import { AddEditMode } from '../data-access/models';

export type PtoStoreState = {
    ptoSchedule: PtoSchedule[],
    ptoAnnual: PtoAnnual | undefined;
}

const initialPtoStoreState: PtoStoreState = {
    ptoSchedule: [],
    ptoAnnual: undefined,
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
    ptoSchedule$ = this.select(x => 
        x.ptoSchedule.sort((p1,p2) => p1.ptoDate > p2.ptoDate ? 1 : p1.ptoDate < p2.ptoDate ? -1 : 0)
    );

    selectedYear$ = this.daysOffStore.selectedYear$;

    ptoRemainingHours$ = this.select(
        this.ptoSchedule$,
        (pto) => {
            const bdHours = pto.map(p => p.burndownHours);
            return Math.min(...bdHours)
        }
    )

    ptoRemainingDays$ = this.select(
        this.ptoRemainingHours$,
        (hours) => {
            return hours / 8.0;
        }
    )

    ptoAnnual$ = this.select(x => x.ptoAnnual);

    doesPtoAnnualNeedToBeCreated$ = this.select(x => x.ptoAnnual?.ptoAnnualId === 0);


    ptoPlanned$ = this.select(
        this.ptoSchedule$,
        (pto) => {
            // const ptoIsScheduled = pto.filter(x => x.isScheduled)
            let sum: number = 0;
            pto.forEach(a => sum += a.hours);
            return sum; 
        }    
    )

    ptoPlannedRemaining$ = this.select(
        this.ptoAnnual$,
        this.ptoPlanned$,
        (annual, planned) => {
            return (+(annual?.totalPtoHours?? 0) - +planned)
        }
    )

    ptoOnHrCalendar$ = this.select(
        this.ptoSchedule$,
        (pto) => {
            const ptoIsScheduled = pto.filter(x => x.isScheduled)
            let sum: number = 0;
            ptoIsScheduled.forEach(a => sum += a.hours);
            return sum; 
        }    
    )

    ptoIsTaken$ = this.select(
        this.ptoSchedule$,
        (pto) => {
            const ptoIsScheduled = pto.filter(x => x.isTaken)
            let sum: number = 0;
            ptoIsScheduled.forEach(a => sum += a.hours);
            return sum; 
        }    
    )

    ptoActualRemaining$ = this.select(
        this.ptoAnnual$,
        this.ptoIsTaken$,
        (annual, actual) => {
            return (+(annual?.totalPtoHours?? 0) - +actual)
        }
    )

    //UPDATERS
    setPtoSchedule = this.updater((state, ptoData: PtoSchedule[]) => {
        // console.log('pto schedule', ptoData)
        return {
            ...state,
            ptoSchedule: ptoData
        }
    })

    setPtoAnnual = this.updater((state, ptoAnnual: PtoAnnual) => {
        // console.log('pto schedule', ptoData)
        return {
            ...state,
            ptoAnnual: ptoAnnual
        }
    })

    addPtoSchedule = this.updater((state, pto: PtoSchedule) => {  
        // let newSchedule = this.buildBurndown(state.ptoSchedule.concat(pto));
        return {
            ...state,
            ptoSchedule: this.buildBurndown(state.ptoSchedule.concat(pto)),
        }
    })

    updatePtoAnnualState = this.updater((state, pto: PtoAnnual) => {  
        // let newSchedule = this.buildBurndown(state.ptoSchedule.concat(pto));
        return {
            ...state,
            ptoAnnual: pto,
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
                const results = this.http.getPtoScheduleFromYear(y);
                this.setPtoSchedule(results);

                const annualResults = this.http.getPtoAnnualFromYear(y);
                this.setPtoAnnual(annualResults);
            })
        )
    ) 

    editPto = this.effect((pto$: Observable<PtoSchedule>) => 
        pto$.pipe(
           switchMap((pto: PtoSchedule) => {

            const dialog = this.dialogService.open(AddEditPtoModalComponent, {
                data: {
                    pto: pto,
                    addOrEditMode: AddEditMode.Edit,
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

            const dialog = this.dialogService.open(AddEditPtoModalComponent, {
                data: {
                    pto: initialPtoSchedule,
                    addOrEditMode: AddEditMode.Add,
                },
                header: `Add New PTO`,
                width: '30vw',
                contentStyle: { overflow: 'auto' },
                modal: true,
            });            
            
            return dialog.onClose.pipe(
                map((pto) => pto)
            );

           }),
           switchMap((pto) => {
                if(pto) {
                    let newPtos: NewPto[] = pto.map((p: NewPto) => {
                        return {
                            ptoDate: p.ptoDate,
                            reason: p.reason,
                            hours: p.hours,
                            isScheduled: p.isScheduled,
                            isTaken: p.isTaken,
                        }
                    })

                    this.http.addPto(newPtos).subscribe(() => {

                        newPtos.forEach(pto => {
                            const dayOfWeek = formatDate(pto.ptoDate, 'EEEE', 'en-US').toString()
                            const ptoWithDayOfWeek = {
                                ...pto,
                                dayOfWeek: dayOfWeek
                            } as PtoSchedule
    
                            // return [                                
                                this.addPtoSchedule(ptoWithDayOfWeek)
                            // ]
                            }
                        )

                        return [
                            this.messageService.add({ severity: 'success', summary: 'PTO Added', detail: newPtos[0].reason?? '' }),
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

    addPtoAnnual = this.effect((trigger$) => 
        trigger$.pipe(
            withLatestFrom(this.daysOffStore.selectedYear$),
           switchMap(([, yr]) => {

            const dialog = this.dialogService.open(AddEditAnnualModalComponent, {
                data: {
                    annualPto: initialPtoSchedule
                },
                header: `Add New Annual PTO for ${yr}`,
                width: '30vw',
                contentStyle: { overflow: 'auto' },
                modal: true,
            });            
            
            return dialog.onClose.pipe(
                map((annual) => annual as NewPtoAnnual)
            );

           }),
           withLatestFrom(this.daysOffStore.selectedYear$),
           switchMap(([annual, selYr]) => {
                
                if(annual) {
                    const newPtoAnnual: NewPtoAnnual = {
                        ptoHours: +annual.ptoHours,
                        carriedOverHours: +annual.carriedOverHours,
                        purchasedHours: +annual.purchasedHours,
                        compTimeHours: +annual.compTimeHours,
                        floatingHours: +annual.floatingHours,
                        year: +selYr,
                    }
                    console.log('addPtoAnnual', newPtoAnnual)
                    this.http.addPtoAnnual(newPtoAnnual).subscribe(
                        (res) => {

                            console.log('returned Annual PTO Entry', res)

                            return [
                                this.messageService.add({ severity: 'success', summary: 'Annual PTO Added', detail: selYr.toString()?? '' }),
                                this.updatePtoAnnualState(res)
                            ]
                        },
                        (err: Error) => {
                            return [
                                this.messageService.add({ severity: 'error', summary: 'Annual PTO Not Saved', detail: err.message?? '' })
                            ] 
                        }
                    )
                     
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
        }).sort((p1,p2) => p1.ptoDate > p2.ptoDate ? 1 : p1.ptoDate < p2.ptoDate ? -1 : 0)
    }


}