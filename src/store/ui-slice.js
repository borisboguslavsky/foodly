import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
	showMobileMenu: false,
}

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialUiState,
	reducers: {
		toggleMobileMenu(state, action) {
			state.showMobileMenu = !state.showMobileMenu
		},
		setMobileMenuVisibility(state, action) {
			state.showMobileMenu = action.payload;
		}
	}
})

export const uiActions = uiSlice.actions;
export default uiSlice;
