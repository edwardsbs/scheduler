import { Year } from "../models";
import { EntityState } from "@ngrx/entity"


export type DaysOffState = EntityState<DaysOffStateItems>

export type DaysOffStateItems = {
    year: number,
    day: Date,
}