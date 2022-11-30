import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
	items: [],
	isLoading: true,
	hasError: false,
	activeTab: 'breakfast'
}

const menuSlice = createSlice({
	name: 'menu',
	initialState: initialMenuState,
	reducers: {
		replaceMenu(state, action) {
			state.items = action.payload.items;
		},
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		setError(state, action) {
			state.hasError = action.payload;
		}
	}
})

export const menuActions = menuSlice.actions;
export default menuSlice;
