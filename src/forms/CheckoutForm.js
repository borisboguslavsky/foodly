import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../store/cart-actions";
import useTextInputField from "../hooks/useTextInputField";

import classes from './StandardFormStyle.module.css'
import FormSubmissionMessage from "../components/UI/FormSubmissionMessage";
import { cartActions } from "../store/cart-slice";

/**
 * @param {prop} setSubmittedOrder
 */
const CheckoutForm = (props) => {

	const dispatch = useDispatch();

	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const items = useSelector(state => state.cart.items)
	const totalAmount = useSelector(state => state.cart.totalAmount)
	const loggedIn = useSelector(state => state.auth.isLoggedIn)
	const email = useSelector(state => state.auth.email)
	const user = useSelector(state => state.auth.uid)

	const notEmpty = (value) => value.trim() !== "";

	const {
		value: nameValue,
		isValid: nameIsValid,
		hasError: nameHasError,
		onChangeHandler: nameOnChangeHandler,
		onBlurHandler: nameOnBlurHandler,
		reset: nameReset,
	} = useTextInputField(notEmpty);
	const {
		value: addressLine1Value,
		isValid: addressLine1IsValid,
		hasError: addressLine1HasError,
		onChangeHandler: addressLine1OnChangeHandler,
		onBlurHandler: addressLine1OnBlurHandler,
		reset: addressLine1Reset,
	} = useTextInputField(notEmpty);
	const {
		value: addressLine2Value,
		isValid: addressLine2IsValid,
		hasError: addressLine2HasError,
		onChangeHandler: addressLine2OnChangeHandler,
		onBlurHandler: addressLine2OnBlurHandler,
		reset: addressLine2Reset,
	} = useTextInputField();
	const {
		value: zipcodeValue,
		isValid: zipcodeIsValid,
		hasError: zipcodeHasError,
		onChangeHandler: zipcodeOnChangeHandler,
		onBlurHandler: zipcodeOnBlurHandler,
		reset: zipcodeReset,
	} = useTextInputField(notEmpty);
	const {
		value: cityValue,
		isValid: cityIsValid,
		hasError: cityHasError,
		onChangeHandler: cityOnChangeHandler,
		onBlurHandler: cityOnBlurHandler,
		reset: cityReset,
	} = useTextInputField(notEmpty);

	const resetForm = () => {
		nameReset();
		addressLine1Reset();
		addressLine2Reset();
		zipcodeReset();
		cityReset();
	};

	const delay = async (ms) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, ms)
		})
	}

	const formIsValid =
		nameIsValid && 
		addressLine1IsValid && 
		addressLine2IsValid && 
		zipcodeIsValid && 
		cityIsValid;

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (!formIsValid) {
			setSubmitError('Form is invalid.')
			return;
		};
		setIsSubmitting(true)
		console.log(`FORM SUBMISSION: 
			Name: ${nameValue}
			Address Line 1: ${addressLine1Value}
			Address Line 2: ${addressLine2Value}
			City: ${cityValue}
			Zipcode: ${zipcodeValue}
		`);
		try {
			const orderData = await placeOrder({
				user: user || 'guest',
				nameValue: nameValue,
				email: email,
				addressLine1Value: addressLine1Value,
				addressLine2Value: addressLine2Value,
				cityValue: cityValue,
				zipcodeValue: zipcodeValue,
				items: items,
				totalAmount: totalAmount
			})
			// setSubmitSuccess(true) // no longer needed due to redirect on order success
			setSubmitError(false)
			await delay(500);
			props.setSubmittedOrder(orderData)
			dispatch(cartActions.clearCart())
		} catch (error) {
			// setSubmitSuccess(false) // no longer needed due to redirect on order success
			setSubmitError(error.message.replaceAll("_", " ").toLowerCase())
			console.error(error)
		}
		setIsSubmitting(false)
		resetForm();
	};

	return(<>
		<form className={classes.standardForm}>
		<h2>Information:</h2>
			<div className={classes.formInputWrapper}>
				<label htmlFor="checkout-name">Name</label>
				<input
					id="checkout-name"
					name="Name"
					type="text"
					className={nameHasError ? 'error' : ''}
					value={nameValue}
					placeholder="Name"
					onChange={nameOnChangeHandler}
					onBlur={nameOnBlurHandler}
					disabled={isSubmitting}
					required
				/>
			</div>
			<div className={classes.formRow}>
				<div className={classes.formInputWrapper}>
					<label htmlFor="checkout-address1">Address Line 1</label>
					<input
						id="checkout-address1"
						name="Address Line 1"
						type="text"
						className={addressLine1HasError ? 'error' : ''}
						value={addressLine1Value}
						placeholder="Address Line 1"
						onChange={addressLine1OnChangeHandler}
						onBlur={addressLine1OnBlurHandler}
						disabled={isSubmitting}
						required
					/>
				</div>
				<div className={classes.formInputWrapper}>
					<label htmlFor="checkout-address2">Address Line 2</label>
					<input
						id="checkout-address2"
						name="Address Line 2"
						type="text"
						className={addressLine2HasError ? 'error' : ''}
						value={addressLine2Value}
						placeholder="Address Line 2"
						onChange={addressLine2OnChangeHandler}
						onBlur={addressLine2OnBlurHandler}
						disabled={isSubmitting}
					/>
				</div>
			</div>
			<div className={classes.formRow}>
				<div className={classes.formInputWrapper}>
					<label htmlFor="checkout-city">City</label>
					<input
						id="checkout-city"
						name="City"
						type="text"
						className={cityHasError ? 'error' : ''}
						value={cityValue}
						placeholder="City"
						onChange={cityOnChangeHandler}
						onBlur={cityOnBlurHandler}
						disabled={isSubmitting}
						required
					/>
				</div>
				<div className={classes.formInputWrapper}>
					<label htmlFor="checkout-zipcode">Zipcode</label>
					<input
						id="checkout-zipcode"
						name="Zipcode"
						type="text"
						className={zipcodeHasError ? 'error' : ''}
						value={zipcodeValue}
						placeholder="Postal Code"
						onChange={zipcodeOnChangeHandler}
						onBlur={zipcodeOnBlurHandler}
						disabled={isSubmitting}
						required
					/>
				</div>
			</div>
			<FormSubmissionMessage
				submitSuccess={submitSuccess}
				submitError={submitError}
			/>
			<button
				type="submit"
				className="btnDark"
				onClick={onSubmitHandler}
				disabled={isSubmitting}
			>
				{!isSubmitting && !loggedIn && 'Checkout as Guest ❯'}
				{!isSubmitting && loggedIn && 'Checkout ❯'}
				{isSubmitting && 'Loading...'}
			</button>
		</form>
	</>)
}

export default CheckoutForm