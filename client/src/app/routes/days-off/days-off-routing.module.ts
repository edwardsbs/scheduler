import { NgModule } from "@angular/core";
import { DaysOffComponent } from "./days-off.component";
import { RouterModule, Routes } from "@angular/router";

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