import { ActionsUnion, ActionTypes, Product } from './actions';

export interface AppState {
    listings: Object;
    cartTotal: number;
    error: any;
    loading: boolean;
}

export const initialState: AppState = {
    listings: {},
    cartTotal: 0,
    error: null,
    loading: false,
};

export function ShopReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
        case ActionTypes.LoadListings:
            return {
                ...state,
                error: null,
                loading: true
            }

        case ActionTypes.LoadListingsSuccess:

            let listings = {}

            action.payload.listings.forEach(listing => {
                listings[listing.id] = listing
            });

            return {
                ...state,
                listings,
                loading: false,
            };

        case ActionTypes.LoadListingsFail:

            return {
                ...state,
                error: action.payload.error,
                loading: false
            };

        case ActionTypes.Add:
            const updatedListings = {
                ...state.listings,
                [action.payload.listingId]: {
                    ...state.listings[action.payload.listingId],
                    quantityInCart: state.listings[action.payload.listingId].quantityInCart + 1
                }
            };
            let updatedCartTotal = 0;
            for (const listingId in state.listings) {
                updatedCartTotal += updatedListings[listingId].quantityInCart * updatedListings[listingId].price;
            }

            return {
                ...state,
                listings: updatedListings,
                cartTotal: updatedCartTotal
            };

        case ActionTypes.Remove:
            const newListings = {
                ...state.listings,
                [action.payload.listingId]: {
                    ...state.listings[action.payload.listingId],
                    quantityInCart: (state.listings[action.payload.listingId].quantityInCart > 0) ? state.listings[action.payload.listingId].quantityInCart - 1 : 0
                }
            };

            let newCartTotal = 0;
            for (const listingId in state.listings) {
                newCartTotal += newListings[listingId].quantityInCart * newListings[listingId].price;
            }

            return {
                ...state,
                listings: newListings,
                cartTotal: newCartTotal
            };

        case ActionTypes.Checkout: return initialState;
        default: return state;
    }
}