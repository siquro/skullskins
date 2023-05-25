import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from "../store";
import { ICart, IItem, IUser } from "../../interfaces";

interface ICartState {
    cart: Array<IItem>;
    totalPrice: number
}
const initialState: ICartState = {
    cart: [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IItem>) => {
            if (state.cart.length >= 10) return
            state.cart.push(action.payload)

            state.totalPrice = state.cart.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((el) => el.assetId !== action.payload)

            state.totalPrice = state.cart.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        },

    },

    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                // @ts-ignore
                ...action.payload.cart,
            };
        });
    },
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartData = (state: RootState) => state.cart;
export const cartReducer = cartSlice.reducer;