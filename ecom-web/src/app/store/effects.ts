import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as shopActions from './actions';
import { HttpClient } from '@angular/common/http';

export interface ResponseData {
    id: number;
    title: string;
    body: string;
    userId: number;
}

@Injectable()
export class ShopEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    loadListings$ = this.actions$.pipe(
        ofType<shopActions.LoadListings>(
            shopActions.ActionTypes.LoadListings
        ),
        mergeMap(() => {
            return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
                map(
                    (responseData: ResponseData[]) => {
                        const listings = responseData.map((data: ResponseData) => {
                            return {
                                id: data.id,
                                title: data.title,
                                data: data.body,
                                price: '10',
                                quantityInCart: 0,
                            }
                        })
                        const payload = { listings }
                        return new shopActions.LoadListingsSuccess(payload)
                    }
                ),
                catchError(err => of(new shopActions.LoadListingsFail({ error: err })))
            )
        })
    )

}