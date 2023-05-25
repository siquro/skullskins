import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from "../store";
import { IUser } from "../../interfaces";

interface UserState {
    user: IUser | null;
}
const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                // @ts-ignore
                ...action.payload.user,
            };
        });
    },
})

export const { setUserData } = userSlice.actions;
export const selectUserData = (state: RootState) => state.user.user;
export const userReducer = userSlice.reducer;