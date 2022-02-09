import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { fetchProducts } from '../../store/actions/products.actions';

// Component
import ProductsList from '../../components/products/products-list/products-list.component';

import classes from './home.styles.module.css';

const Home = props => {
	const dispatch = useDispatch();

	// State (Redux)
	const products = useSelector(state => state.products.products);
	const token = useSelector(state => state.user.token);
	const user = useSelector(state => state.user);

	//const userId = sessionStorage.getItem('userId');


	// Effects
	useEffect(() => {
		if(token)
		{
			dispatch(fetchProducts(token));
		}

	}, [token, dispatch]);

	return (
		<Fragment>
			{
				user.isAuth ? 
				(
					<ProductsList userId={ user.userId } products={products} />
				)
				:
				(
					<></>
				)
			}
		</Fragment>
	);
};

export default Home;
