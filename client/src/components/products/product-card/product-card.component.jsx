import { useRef, useState } from 'react';
import axios from 'axios';

// Components
import Button from '../../UI/button/button.component';

import classes from './product-card.styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../../store/actions/order.actions';

const ProductCard = ({ product, myProduct = false }) => {

	const dispatch = useDispatch();

	const [inputValue, setInputValue] = useState('');
	// Refs
	const requestedQtyInputRef = useRef();

	const token = useSelector(state => state.user.token);

	const onAddToCartHandler = () => {


		const qty = +requestedQtyInputRef.current.value;

		if (qty < 0) return;

		dispatch(addProductToCart(token, product, qty));
		// TODO: SEND API REQUEST
		// /api/v1/orders/add-product-to-cart
	};

	return (
		<div className={classes.card}>
			<div className={classes.card__header}>
				<div className={classes.titles}>
					<h3 className={classes.product__title}>{product.name}</h3>
					<p className={classes.product__seller}>Sold by: {product.user.name}</p>
					<p className={classes.product__seller}>Available: {product.quantity}</p>
				</div>

				<div className={classes['button-container']}>
					{/* TODO: DONT SHOW THIS BUTTON IF THE USER IS THE OWNER OF THE PRODUCT */}
					<input
						className={classes['requested-qty-input']}
						type="number"
						ref={requestedQtyInputRef}
					/>
					<Button
						disabled={ myProduct }
						type="button"
						onClick={onAddToCartHandler}
						label="Add to Cart"
					/>
				</div>
			</div>

			<div className={classes.card__body}>
				<p className={classes.product__description}>{product.description}</p>
				<p className={classes.product__price}>${product.price}</p>
			</div>
		</div>
	);
};

export default ProductCard;
