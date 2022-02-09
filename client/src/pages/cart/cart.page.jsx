import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// Redux
import { fetchCart } from '../../store/actions/cart.actions';

// Componets
import CartItem from '../../components/cart/cart-item/cart-item.component';

import classes from './cart.styles.module.css';
import Button from '../../components/UI/button/button.component';

import { useNavigate } from 'react-router-dom';

const Cart = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log('cartttt');
	// State (Redux)
	const cartProducts = useSelector(state => state.cart.selectedProducts);
	const token = useSelector(state => state.user.token);

	useEffect(() => {

		dispatch(fetchCart(token));
	}, [dispatch, token]);

	const purchaseCart = async() => {
		
		// Coloque el try-catch aquí por que cuando lo coloque en el archivo action me daba el siguiente 
		// error:
		// //Uncaught RangeError: Maximum call stack size exceeded
		// no se a que se debiera, en node no me daba ningún error, supongo que es algo de react

		try {
			// TODO: FETCH DATA FROM API
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};
            
			const resp = await axios.get(
				`/api/v1/orders/purchase-order`,
				config
			);



			navigate('/orders');
		} catch (error) {
			console.log(error.request);
		}
	}

	return (
		<div className={classes['cart-list']}>
			<h2>Your cart</h2>
			{cartProducts.map((cartItem) => (
				<CartItem key={ cartItem.id } product={ cartItem }/>
			))}
			<Button type="button" onClick={ purchaseCart } label={'Purchase Cart'}>

			</Button>
		</div>
	);
};

export default Cart;
