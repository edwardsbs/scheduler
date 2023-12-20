import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DaysOffComponent } from "./days-off.component";
import { HolidaysComponent } from "./holidays/holidays.component";

const routes: Routes = [
    {
        path: '',
        component: DaysOffComponent
    },
    {
        path: 'days-off',
        component: DaysOffComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DaysOffRoutingModule {}