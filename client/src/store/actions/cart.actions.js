import axios from 'axios';

import { cartActions } from '../slices/cart.slice';

export const fetchCart = (token) => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

            
			const response = await axios.get(
				`/api/v1/orders/get-cart`,
				config
			);

			dispatch(cartActions.getCart({ cartProducts: response.data.data.cart.products }));
		} catch (error) {
			console.log(error);
			dispatch(cartActions.getCart({ cartProducts: [] }));
		}
	};
};


export const updateItemCart = (token, body) => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
            
			const resp = await axios.patch(
				`/api/v1/orders/update-cart-product`,
				body,
				config
			);


			const response = await axios.get(
				`/api/v1/orders/get-cart`,
				config
			);

			dispatch(cartActions.getCart({ cartProducts: response.data.data.cart.products }));

			//	console.log('op', response);

			//dispatch(cartActions.updateProductInCart({ id: body.productId, newQuantity: body.newQuantity}));
		} catch (error) {
			console.log(error.request);
		}
	};
};



export const removeItemCart = (token, body) => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API

			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
            
			const resp = await axios.patch(
				`/api/v1/orders/removeproductcart`,
				body,
				config
			);


			const response = await axios.get(
				`/api/v1/orders/get-cart`,
				config
			);

			dispatch(cartActions.getCart({ cartProducts: response.data.data.cart.products }));

			//	console.log('op', response);

			//dispatch(cartActions.updateProductInCart({ id: body.productId, newQuantity: body.newQuantity}));
		} catch (error) {
			console.log(error.request);
		}
	};
};




export const purchaseCart = (token) => {
	return async dispatch => {
		try {
			// TODO: FETCH DATA FROM API
			//react-dom.development.js:4091 
        
			//Uncaught RangeError: Maximum call stack size exceeded
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
            
			const resp = await axios.post(
				`/api/v1/orders/purchase-order`,
				config
			);


			//dispatch(cartActions.getCart({ cartProducts: response.data.data.cart.products }));

			//	console.log('op', response);

			//dispatch(cartActions.updateProductInCart({ id: body.productId, newQuantity: body.newQuantity}));
		} catch (error) {
			console.log(error.request);
		}
	};
};
