'use client'
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { userReducer, cartReducer } from "@/redux/slice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    });

function makeStore() {

    const isServer = typeof window === "undefined";

    if (isServer) {
        return makeConfiguredStore()
    } else {
        const persistConfig = {
            key: 'root',
            storage
        }

        const persistedReducer = persistReducer(persistConfig, rootReducer)

        let store: any = configureStore({
            reducer: persistedReducer,
            devTools: process.env.NODE_ENV !== 'production',
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }),
        })
        store.__persistor = persistStore(store)
        return store
    }
}

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const wrapper = createWrapper<RootStore>(makeStore, { debug: false });

