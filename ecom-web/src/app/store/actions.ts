import { Action } from '@ngrx/store';

export interface Product {
    title: string;
    price: string;
    data: string;
    id: string;
    quantityInCart: number;
}

export enum ActionTypes {
    Add = '[Shop] Add to cart',
    Remove = '[Shop] Remove from cart',
    Checkout = '[Shop] Checkout',
    LoadListings = '[Shop] Get Listings',
    LoadListingsSuccess = '[Shop] Get Listings Success',
    LoadListingsFail = '[Shop] Get Listings Fail',
}

export class LoadListings implements Action {
    readonly type = ActionTypes.LoadListings;
}

export class LoadListingsSuccess implements Action {
    readonly type = ActionTypes.LoadListingsSuccess;

    constructor(public payload: { listings }) { }
}

export class LoadListingsFail implements Action {
    readonly type = ActionTypes.LoadListingsFail;

    constructor(public payload: { error }) { }
}

export class Checkout implements Action {
    readonly type = ActionTypes.Checkout;
}

export class AddToCart implements Action {
    readonly type = ActionTypes.Add;

    constructor(public payload: { listingId: string }) { }
}

export class RemoveFromCart implements Action {
    readonly type = ActionTypes.Remove;

    constructor(public payload: { listingId: string }) { }
}

export type ActionsUnion = AddToCart | RemoveFromCart | Checkout | LoadListings | LoadListingsSuccess | LoadListingsFail;