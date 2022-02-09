import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			const response = await axios.post(
				//`${process.env.REACT_APP_API_URL}/users/login`,
				'http://localhost:3004/api/v1/users/login',
				{
					email,
					password,
				}
			);
				console.log('sign up', response);
			const { user, token } = response.data.data;

			sessionStorage.setItem('token', token);
			//sessionStorage.setItem('userId', user.id);

			dispatch(userActions.login({ userId: user.id, token, name: user.name, email: user.email }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = (body) => {
	return async dispatch => {
		try {
			const response = await axios.post(
				//`${process.env.REACT_APP_API_URL}/users/login`,
				'http://localhost:3004/api/v1/users',
				body
			);

			// por alguna razón, aunque era el mismo código, si guardaba la información del usuario
			// con la respuesta del controlodar de crear ususario no me traía los productos cuando
			// cambiaba a la interfaz de los productos, se me hizo un error muy muy extraño, y no encontré 
			// la manera de corregirlo, así que después de crear el usuario lo loggeo  


			const resp = await axios.post(
				//`${process.env.REACT_APP_API_URL}/users/login`,
				'http://localhost:3004/api/v1/users/login',
				body
			);


			const { user, token } = resp.data.data;

			sessionStorage.setItem('token', token);
			//sessionStorage.setItem('userId', user.id);

			dispatch(userActions.signup({ userId: user.id, token, name: user.name, email: user.email  }));
		} catch (error) {
			console.log(error.request);
		}
	};
};


export const updateUserAction = ( body, token, id) => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API

			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

            
			const response = await axios.patch(
				`/api/v1/users/${id}`,
				body,
				config
			);


			const { user } = response.data.data;

			dispatch(userActions.login({ userId: user.id, token, name: user.name, email: user.email }));
		
		} catch (error) {
			console.log(error);
		}
	};
};

export const checkUserAuth = token => {
	return dispatch => {
		dispatch(userActions.checkAuth({ userAuth: !!token, token }));
	};
};
