import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
