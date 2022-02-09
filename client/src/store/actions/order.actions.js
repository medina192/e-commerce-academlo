import axios from 'axios';

import { ordersActions } from '../slices/orders.slice';

export const addProductToCart = (token, product, qty) => {

	return async dispatch => {
		try {

			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

            let newProduct = {
                category: product.category,
                description: product.description,
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: qty || 1,
                status: product.status,
            }

            const body = {
                product: newProduct
            }

			const response = await axios.post(
				`/api/v1/orders/add-product-to-cart`,
                body,
				config
			);

			//dispatch(productsActions.getProducts({ products }));
		} catch (error) {
			console.log(error.request);
		}
	};
};




export const getAllOrders = (token) => {

	return async dispatch => {
		try {

			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const response = await axios.get(
				`/api/v1/orders`,
				config
			);	
			
			dispatch(ordersActions.getOrders({ orders:  response.data.data.orders}));
		} catch (error) {
			console.log(error.request);
		}
	};
};
