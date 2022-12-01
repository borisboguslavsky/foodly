import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token')
const initialEmail = localStorage.getItem('email')
const initialUid = localStorage.getItem('uid')
const expirationTime = localStorage.getItem('expirationTime')

const initialAuthState = {
	userIsRegistering: false,
	isLoggedIn: initialToken && initialEmail && initialUid ? true : false,
	orders: {},
	token: initialToken,
	email: initialEmail,
	uid: initialUid,
	expirationTime: expirationTime,
	logoutTimer: undefined
}

const setUserIsRegistering = (state, action) => {
	state.userIsRegistering = action.payload;
	console.log(`userIsRegistering: ${state.userIsRegistering}`)
}

const setUserOrders = (state, action) => {
	state.orders = action.payload || {};
}

const setLogoutTimer = (state, action) => {
	if (state.logoutTimer) clearTimeout(state.logoutTimer)
	state.logoutTimer = action.payload;
}

const login = (state, action) => {
	state.email = action.payload.email;
	localStorage.setItem('email', action.payload.email)
	state.isLoggedIn = true;
	state.token = action.payload.idToken;
	localStorage.setItem('token', action.payload.idToken)
	state.uid = action.payload.localId;
	localStorage.setItem('uid', action.payload.localId)
	state.expirationTime = action.payload.expirationTime;
	localStorage.setItem('expirationTime', action.payload.expirationTime)
	console.log(`email: ${state.email}\nuid: ${state.uid}\ntoken: ${state.token}`)
}

const logout = (state, action) => {
	console.log(`${state.email} Logged Out`)
	state.email = '';
	localStorage.removeItem('email')
	state.isLoggedIn = false;
	state.token = '';
	localStorage.removeItem('token')
	state.uid = '';
	localStorage.removeItem('uid')
	state.expirationTime = '';
	localStorage.removeItem('expirationTime')
	state.orders = {};
	if (state.logoutTimer) clearTimeout(state.logoutTimer)
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		setUserIsRegistering,
		setUserOrders,
		setLogoutTimer,
		login,
		logout
	}
})

export const authActions = authSlice.actions;
export default authSlice;