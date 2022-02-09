import { useSelector, useDispatch } from 'react-redux';

import React, {useEffect} from 'react';
// Redux

// Components
import OrderItem from '../../components/orders/order-item/order-item.component';

import classes from './orders.styles.module.css';
import { getAllOrders } from '../../store/actions/order.actions';

const Orders = () => {

	const dispatch = useDispatch();

	const orders = useSelector(state => state.orders.orders);
	const token = useSelector(state => state.user.token);


	useEffect(() => {

		dispatch(getAllOrders(token));
	}, [dispatch, token])
	

	return (
		<div className={classes['orders-list']}>
			{
				orders.map( order => {
					return(
						<OrderItem 
							key={order.id}
							date={order.date} 
							totalPrice={order.totalPrice} 
							id={order.id} 
							productsInOrders={order.productsInOrders}/>
					)
				})
			}

		</div>
	);
};

export default Orders;
