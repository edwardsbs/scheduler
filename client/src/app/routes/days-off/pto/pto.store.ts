import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PtoSchedule } from './data-access/models';
import { PtoHttpService } from './data-access/services/pto-http.service';
// import { DaysOffActions } from '../data-access/store/days-off.actions';
import { tap, skip, switchMap, Observable, map } from 'rxjs'
import { DaysOffStore } from '../days-off.store';
// import { ofType } from '@ngrx/effects'
// import { DaysOffState, DaysOffStateItems } from '../data-access/store/days-off.state';
// import { DialogService } from '@progress/kendo-angular-dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';

export type PtoStoreState = {
    ptoSchdule: PtoSchedule[]
}

const initialPtoStoreState: PtoStoreState = {
    ptoSchdule: []
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
    ptoSchedule$ = this.select(x => x.ptoSchdule);

    selectedYear$ = this.daysOffStore.selectedYear$;


    //UPDATERS
    setPtoSchedule = this.updater((state, ptoData: PtoSchedule[]) => {
        // console.log('pto schedule', ptoData)
        return {
            ...state,
            ptoSchdule: ptoData
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

            // const dateString = 

            const dialog = this.dialogService.open(AddEditModalComponent, {
                data: {
                    pto: pto
                },
                header: `Edit PTO for ${this.convertDateString(new Date(pto.ptoDate))}`,
                width: '50vw',
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
                    // http call to save changes
                    return [
                        this.messageService.add({ severity: 'info', summary: 'PTO Saved', detail: pto.reason?? '' })
                    ]       
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

    // setDefaultPtoSchedule = this.effect((trigger$) => 
    //     trigger$.pipe(
    //         tap(() => {
    //             const results = this.http.getPtoScheduleFromYear(2023)
    //             this.setPtoSchedule(results)
    //         })
    //     )
    // )


}