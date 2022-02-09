import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	isAuth: false,
	token: null,
	email: null,
	name: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuth = true;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		logout: state => {
			state.isAuth = false;
			state.token = null;
			state.userId = null;
		},
		signup: (state, action) => {
			state.isAuth = true;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		checkAuth: (state, action) => {
			state.isAuth = action.payload.userAuth;
			state.token = action.payload.token;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
