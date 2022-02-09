// Reducers
import userReducer from './slices/user.slice';
import productsReducer from './slices/products.slice';
import cartReducer from './slices/cart.slice';
import ordersSlice from './slices/orders.slice';

const rootReducer = {
	user: userReducer,
	products: productsReducer,
	cart: cartReducer,
	orders: ordersSlice
};

export default rootReducer;
