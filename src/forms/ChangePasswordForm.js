import { useState } from "react";
import { useSelector } from "react-redux";
import { changeUserPassword } from "../store/auth-actions";

import FormSubmissionMessage from "../components/UI/FormSubmissionMessage";

import useTextInputField from "../hooks/useTextInputField";

import classes from './StandardFormStyle.module.css'

const ChangePasswordForm = () => {

	const token = useSelector(state => state.auth.token)

	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validPass = (string) => {
		if (string.length > 6) return true
		return false
	}

	const matchingPass = (string) => {
		return validPass(string) && string === passValue;
	}

	const {
		value: passValue,
		isValid: passIsValid,
		hasError: passHasError,
		onChangeHandler: passOnChangeHandler,
		onBlurHandler: passOnBlurHandler,
		reset: passReset,

	} = useTextInputField(validPass);
	const {
		value: confirmPassValue,
		isValid: confirmPassIsValid,
		hasError: confirmPassHasError,
		onChangeHandler: confirmPassOnChangeHandler,
		onBlurHandler: confirmPassOnBlurHandler,
		reset: confirmPassReset,
	} = useTextInputField(matchingPass);

	const submitHandler = async (event) => {
		event.preventDefault();
		if (!passIsValid) {
			setSubmitError('Must be at least 6 characters.')
			return;
		};
		if (!confirmPassIsValid) {
			setSubmitError('Confirmed password does not match.')
			return;
		};
		setIsSubmitting(true)
		try {
			let result = await changeUserPassword({
				token: token,
				newPassword: passValue
			})
			setSubmitSuccess(true);
			passReset();
			confirmPassReset()
		} catch(error) {
			setSubmitError(error.message.replaceAll("_", " ").toLowerCase())
		}
		setIsSubmitting(false);
	}

	return(<>
		<form className={classes.standardForm}>
			<div className={classes.formInputWrapper}>
				<label htmlFor="changepw-newpassword">New Password</label>
				<input
					id="changepw-newpassword"
					name="New Password"
					type="password" 
					className={passHasError ? 'error' : ''}
					value={passValue}
					placeholder="New Password"
					onChange={passOnChangeHandler}
					onBlur={passOnBlurHandler}
					disabled={isSubmitting}
					required
				/>
			</div>
			<div className={classes.formInputWrapper}>
				<label htmlFor="changepw-confirmpassword">Confirm New Password</label>
				<input
					id="changepw-confirmpassword"
					name="New Password"
					type="password" 
					className={confirmPassHasError ? 'error' : ''}
					value={confirmPassValue}
					placeholder="Confirm Password"
					onChange={confirmPassOnChangeHandler}
					onBlur={confirmPassOnBlurHandler}
					disabled={isSubmitting}
					required
				/>
			</div>
			<FormSubmissionMessage
				submitSuccess={submitSuccess}
				submitError={submitError}
			/>
			<button
				type="submit" 
				className="btnDark" 
				onClick={submitHandler}
				disabled={isSubmitting}
			>
				{!isSubmitting && 'Submit ❯'}
				{isSubmitting && 'Loading...'}
			</button>
		</form>
	</>)
}

export default ChangePasswordForm