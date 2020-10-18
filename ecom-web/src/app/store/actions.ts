import { Action } from '@ngrx/store';

export interface Product {
    title: string;
    price: number;
    data: string;
    id: string;
    quantityInCart: string;
}

export enum ActionTypes {
    Add = '[Product] Add to cart',
    Remove = '[Product] Remove from cart',
    Checkout = '[Product] Checkout',
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

export type ActionsUnion = AddToCart | RemoveFromCart | Checkout;