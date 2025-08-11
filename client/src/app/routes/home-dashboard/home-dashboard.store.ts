import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Associate } from "./data-access/models";
import { AssocHttpService } from "./data-access/services/assoc-http.service";
import { tap } from "rxjs";

export interface HomeDashboardState {
    associates: Associate[]
}

const initialHomeDashboardState: HomeDashboardState = {
    associates: []
}

@Injectable()
export class HomeDashboardStore extends ComponentStore<HomeDashboardState> {

    constructor(
        private readonly http: AssocHttpService
    ) {
        super(initialHomeDashboardState)

        setTimeout(() => {
            this.getAssociates()
        })
    }

    //SELECTORS
    associates$ = this.select(x => x.associates)


    //UPDATERS
    setAssociates = this.updater((state, assocs: Associate[]) => {
        return {
            ...state,
            associates: assocs
        }
    })


    //EFFECTS
    getAssociates = this.effect((trigger$) => 
        trigger$.pipe(
            tap(() =>{
                const results = this.http.getAssocs()
                this.setAssociates(results)
            })
        )
    )
}