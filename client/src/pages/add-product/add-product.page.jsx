import { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Input from '../../components/UI/input/input.component';
import Button from '../../components/UI/button/button.component';

import classes from './add-product.styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const AddProduct = () => {
	const navigate = useNavigate();

	// Refs
	const nameInputRef = useRef();
	const descriptionInputRef = useRef();
	const priceInputRef = useRef();
	const quantityInputRef = useRef();
	const categoryInputRef = useRef();
	const imageInputRef = useRef();
	

	const token = useSelector(state => state.user.token);

	const onSubmitHandler = async(e) => {
		e.preventDefault();

		// Use this syntax when handling files, this converts it to multipart/form-data
		const productFormData = new FormData();

		// aqui intente de todo, pero no pude hacer que node pudiera leer los datos
		// así, que comente la parte de la lectura de la imagen en el controlodor de node :(

		productFormData.append('name', nameInputRef.current.value);
		productFormData.append('description', descriptionInputRef.current.value);
		productFormData.append('price', +priceInputRef.current.value);
		productFormData.append('quantity', +quantityInputRef.current.value);
		productFormData.append('category', categoryInputRef.current.value);
		productFormData.append('productImgs', imageInputRef.current.files[0]);
		// TODO: SEND PRODUCT DATA TO SAVE IT ON THE DB

		const body = {
			name: nameInputRef.current.value,
			description: descriptionInputRef.current.value,
			price: +priceInputRef.current.value,
			quantity: +quantityInputRef.current.value,
			category: categoryInputRef.current.value,
		}
		
		try {
			// TODO: FETCH DATA FROM API
			const config = {
				headers: { Authorization: `Bearer ${token}`,
			}
			};

            
			const response = await axios.post(
				`http://localhost:3004/api/v1/products`,
				body,
				config
			);

			navigate('/');
		} catch (error) {
			console.log(error.request);
		}


	};

	return (
		<Fragment>
			<form onSubmit={onSubmitHandler} className={classes['add-product-form']}>
				<h2>Add a new product</h2>
				<Input label="Name" input={{ type: 'text', ref: nameInputRef }} />
				<Input
					label="Description"
					input={{ type: 'text', ref: descriptionInputRef }}
				/>
				<Input label="Price" input={{ type: 'number', ref: priceInputRef }} />
				<Input
					label="Quantity"
					input={{ type: 'number', ref: quantityInputRef }}
				/>
				<Input
					label="Category"
					input={{ type: 'text', ref: categoryInputRef }}
				/>
				<Input
					label="Image"
					input={{ type: 'file', accept: 'image/*', ref: imageInputRef }}
				/>

				<Button type="submit" label="Add product" />
			</form>
		</Fragment>
	);
};

export default AddProduct;
