import { useRef, useState } from 'react';
import { updateItemCart, removeItemCart } from '../../../store/actions/cart.actions';

// Components
import Button from '../../UI/button/button.component';

import { useDispatch, useSelector } from 'react-redux';

import classes from './cart-item.styles.module.css';

const CartItem = ({ product }) => {

	const dispatch = useDispatch();

	const { productId, name, requestedQty, price, quantity } = product;


	const token = useSelector(state => state.user.token);
	// State
	const [updateQty, setUpdateQty] = useState(requestedQty);

	// Refs
	const updateQtyInputRef = useRef();

	// Handlers
	const onUpdateInputChangeHandler = () => {
		//const updateQty = +updateQtyInputRef.current.value;

		//if (updateQty < 0) return;

		//setUpdateQty(updateQty);
	};

	const onUpdateProductHandler = () => {


		
		//if(+updateQtyInputRef.current.value <= quantity)
			dispatch(updateItemCart(token, {productId, newQuantity: +updateQtyInputRef.current.value }));
	};

	const onRemoveProductHandler = () => {
		//if(+updateQtyInputRef.current.value <= quantity)
			dispatch(removeItemCart(token, {productId }));
	};

	return (
		<div className={classes['cart-item']}>
			<div className={classes['cart-item__product']}>
				<h3>{name}</h3>
				<p>id: {productId}</p>
				<p>Quantity: {quantity}</p>
				<p>${+price}</p>
			</div>
			<div className={classes['cart-item__actions']}>
				<input
					type="number"
					value={updateQty}
					onChange={onUpdateInputChangeHandler}
					ref={updateQtyInputRef}
					className={classes['update-qty-input']}
				/>
				<Button type="button" onClick={onUpdateProductHandler} label="Update" />
				<Button type="button" onClick={onRemoveProductHandler } label="Remove" />
			</div>
		</div>
	);
};

export default CartItem;
