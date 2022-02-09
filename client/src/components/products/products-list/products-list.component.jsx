// Components
import ProductCard from '../product-card/product-card.component';

import classes from './products-list.styles.module.css';

const ProductsList = ({ products, userId }) => {

	return (
		<div className={classes.products__list}>
			{/* <ProductCard
				name={'Book'}
				description={'An awesome book'}
				price={12.99}
				userId={1}
			/> */}
			{products.map(product => {

				if(product.user.id !== +userId)
				{
					return(
						<ProductCard key={product.id}  product={product} />
					)
				}
				else{
					<></>
				}
			})}
		</div>
	);
};

export default ProductsList;
