import axios from 'axios';

import { productsActions } from '../slices/products.slice';

export const fetchProducts = token => {
	return async dispatch => {
		try {

			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const response = await axios.get(
				`/api/v1/products`,
				config
			);

			const { products } = response.data.data;

			dispatch(productsActions.getProducts({ products }));
		} catch (error) {
			console.log(error);
		}
	};
};
