import { useRef } from 'react';

// Components
import Modal from '../../UI/modal/modal.component';
import Button from '../../UI/button/button.component';
import Input from '../../UI/input/input.component';
import { useDispatch, useSelector } from 'react-redux';

import classes from './update-form-modal.style.module.css';
import { updateUserAction } from '../../../store/actions/user.actions';

const UpdateFormModal = ({ onClose, currentUsername, currentEmail, userId }) => {
	const usernameInputRef = useRef();
	const emailInputRef = useRef();

	const token = useSelector(state => state.user.token);

	const dispatch = useDispatch();

	// Handlers
	const onSubmitHandler = () => {};

	const updateUser = () => {


		if(usernameInputRef.current.value === '' || emailInputRef.current.value === '')
			return;

		const body = {
			name: usernameInputRef.current.value,
			email: emailInputRef.current.value
		}
		dispatch(updateUserAction(body, token, userId));
		onClose();
	}

	return (
		<Modal onClick={onClose}>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<h3>You can update your profile here</h3>
				<Input
					label="Username"
					input={{
						type: 'text',
						ref: usernameInputRef,
						placeholder: currentUsername,
					}}
				/>
				<Input
					label="Email"
					input={{
						type: 'email',
						ref: emailInputRef,
						placeholder: currentEmail,
					}}
				/>
			</form>

			<div className={classes.actions}>
				<Button type="submit" onClick={updateUser} label="Update" />
				<Button type="button" onClick={onClose} label="Cancel" />
			</div>
		</Modal>
	);
};

export default UpdateFormModal;
