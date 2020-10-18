import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
    listings: {
        1: { id: '1', price: '20', title: 'Listing One', data: 'Listing Data', quantityInCart: 0 },
        2: { id: '2', price: '30', title: 'Listing Two', data: 'Listing Data', quantityInCart: 0 },
        3: { id: '3', price: '40', title: 'Listing Three', data: 'Listing Data', quantityInCart: 0 },
        4: { id: '4', price: '50', title: 'Listing Four', data: 'Listing Data', quantityInCart: 0 },
        5: { id: '5', price: '60', title: 'Listing Five', data: 'Listing Data', quantityInCart: 0 },
    },
    cartTotal: 0
};

export function ShopReducer(state = initialState, action: ActionsUnion) {
    switch (action.type) {
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
                updatedCartTotal += state.listings[listingId].quantityInCart * state.listings[listingId].price;
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
                newCartTotal += state.listings[listingId].quantityInCart * state.listings[listingId].price;
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