import { useState, useEffect } from 'react';

// Components
import Button from '../../components/UI/button/button.component';
import UpdateFormModal from '../../components/profile/update-form-modal/update-form-modal.component';

import classes from './profile.styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../../components/products/product-card/product-card.component';

const Profile = () => {
	// State
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	// Handlers
	const onOpenModal = () => {
		setShowModal(true);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};


	const products = useSelector(state => state.products.products);
	const token = useSelector(state => state.user.token);
	const user = useSelector(state => state.user);
	
	//const userId = sessionStorage.getItem('userId');


	return (
		<div>
			<div className={classes['user-data']}>
				<h3 className={classes['user-data__username']}>{user.name}</h3>
				<h3 className={classes['user-data__username']}>{user.email}</h3>

				<div className={classes['button-container']}>
					<Button type="button" label="Update profile" onClick={onOpenModal} />
				</div>
			</div>

			<div>
				<h3>Your products</h3>


				<div className={classes.products__list}>
			{/* <ProductCard
				name={'Book'}
				description={'An awesome book'}
				price={12.99}
				userId={1}
			/> */}
			{products.map(product => {

				if(product.user.id == user.userId)
				{
					return(
						<ProductCard myProduct={ true } key={product.id}  product={product} />
					)
				}
				else{
					<></>
				}
			})}
		</div>
			</div>

			{showModal && (
				<UpdateFormModal
					currentUsername={user.name}
					currentEmail={user.email}
					userId={ user.userId }
					onClose={onCloseModal}
				/>
			)}
		</div>
	);
};

export default Profile;
