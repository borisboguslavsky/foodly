import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';

import { authActions } from '../store/auth-slice';
import { userLoginOrSignup } from '../store/auth-actions';

import FormSubmissionMessage from '../components/UI/FormSubmissionMessage';

import classes from './StandardFormStyle.module.css'

/**
 * The log in form, where users can enter a password and email to either
 * sign up with a new account, or log in with an existing account.
 */
const LoginForm = () => {

	const dispatch = useDispatch();
	const userIsRegistering = useSelector(state => state.auth.userIsRegistering)

	const emailRef = useRef();
	const passwordRef = useRef();
	
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false)

	const signUpModeToggleHandler = (event) => {
		event.preventDefault();
		dispatch(authActions.setUserIsRegistering(!userIsRegistering))
		setSubmitSuccess(false)
		setSubmitError(false)
	}

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			let result = await userLoginOrSignup({
				enteredEmail: emailRef.current.value,
				enteredPassword: passwordRef.current.value,
				userIsRegistering: userIsRegistering
			})
			const currentTime = new Date().getTime()
			const expirationTime = new Date(new Date().getTime() + (result.expiresIn * 1000)).getTime();

			// Auto logout after auth token expires
			const logoutTimer = setTimeout(() => {
				dispatch(authActions.logout())
			}, expirationTime - currentTime)
			// Store logout timer in the auth store
			dispatch(authActions.setLogoutTimer(logoutTimer))
			dispatch(authActions.login({...result, expirationTime: expirationTime}))
			setSubmitSuccess(true)
		} catch(error){	
			setSubmitError(error.message.replaceAll("_", " ").toLowerCase())
		}
		setIsSubmitting(false);
	}

	const formCss = `${classes.standardForm} ${classes.centeredForm}`

	return(
		<form className={formCss}>
			<div className={classes.formInputWrapper}>
				<label htmlFor="login-email">Email</label>
				<input
					id="login-email"
					name="Login Email"
					ref={emailRef}
					type="email"
					required
				/>
			</div>
			<div className={classes.formInputWrapper}>
				<label htmlFor="login-password">Password</label>
				<input
					id="login-password"
					name="Login Password"
					ref={passwordRef}
					type="password"
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
				disabled={isSubmitting}
				onClick={submitHandler}
			>
				{userIsRegistering && !isSubmitting && `Register ❯`}
				{!userIsRegistering && !isSubmitting && `Submit ❯`}
				{isSubmitting && `Loading...`}
			</button>
			<button className={classes.textLinkButton} onClick={signUpModeToggleHandler}>
				{userIsRegistering && `Already have an account? Log in!`}
				{!userIsRegistering && `Don't have an account? Sign up!`}
			</button>
		</form>
	)
}

export default LoginForm;