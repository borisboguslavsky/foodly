import { configureStore  } from "@reduxjs/toolkit";
import cartSlice from './cart-slice'
import menuSlice from "./menu-slice";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
		menu: menuSlice.reducer,
		auth: authSlice.reducer,
		ui: uiSlice.reducer
	}
})

export default store;