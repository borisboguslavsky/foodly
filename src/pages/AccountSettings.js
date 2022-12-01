import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from './AccountSettings.module.css'

import Card from "../components/UI/Card";
import ProtectedRoute from '../components/ProtectedRoute'
import ChangePasswordForm from "../forms/ChangePasswordForm";
import FormSubmissionMessage from "../components/UI/FormSubmissionMessage";

import { deleteOrderHistory, deleteAccount } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";

/**
 * Account settings page that lets the user change their password,
 * delete their order history, and delete their account.
 */
const AccountSettings = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const uid = useSelector(state => state.auth.uid)
	const token = useSelector(state => state.auth.token)

	const [currentlyDeletingOrders, setCurrentlyDeletingOrders] = useState(false);
	const [orderDeletionSuccess, setOrderDeletionSuccess] = useState(false)
	const [orderDeletionError, setOrderDeletionError] = useState(false)
	const [currentlyDeletingAccount, setCurrentlyDeletingAccount] = useState(false);
	const [accountDeletionSuccess, setAccountDeletionSuccess] = useState(false)
	const [accountDeletionError, setAccountDeletionError] = useState(false)

	const deleteOrderHistoryHandler = async () => {
		setCurrentlyDeletingOrders(true)
		if (!window.confirm('Are you sure you want to delete your order history?')) {
			return;
		}
		try {
			const result = await deleteOrderHistory({
				userId: uid,
				token: token
			});
			setOrderDeletionSuccess(true);
		} catch(error) {
			setOrderDeletionError(error.message.replaceAll("_", " ").toLowerCase())
		}
		setCurrentlyDeletingOrders(false)
	}

	const deleteAccountHandler = async () => {
		setCurrentlyDeletingAccount(true)
		if (!window.confirm('Are you sure you want to delete your account?')) {
			return;
		}
		try {
			await deleteOrderHistoryHandler();
			const result = await deleteAccount({
				token: token
			});
			setAccountDeletionSuccess(true);
		} catch(error) {
			setAccountDeletionError(error.message.replaceAll("_", " ").toLowerCase())
		}
		setCurrentlyDeletingAccount(false)
	}

	useEffect(() => {
		if (accountDeletionSuccess) dispatch(authActions.logout())
	}, [accountDeletionSuccess])

	if (accountDeletionSuccess) {
	return(
		<Card 
			title="Account Deleted"
			buttonText="Home ❯"
			buttonClickHandler={() => {navigate('/menu')}}
		>
			<p>Your account and order history has been successfully deleted.</p>
		</Card>
	)
	}

	return(
	<ProtectedRoute check={isLoggedIn} redirect="/login">
		<Card title="Settings" className={classes.accountSettings}>
			<h2>Change Password</h2>
			<p>Use the form below to change the password for your account.</p>
			<ChangePasswordForm />
			<hr className={classes.divider}/>
			<h2>Delete Order History</h2>
			<p>Permanently delete your entire order history.</p>
			<FormSubmissionMessage
				submitSuccess={orderDeletionSuccess}
				submitError={orderDeletionError}
			/>
			<button
				className="btnDark"
				onClick={deleteOrderHistoryHandler}
				disabled={currentlyDeletingOrders || orderDeletionSuccess}
			>
				{currentlyDeletingOrders ? 'Deleting Orders...' : 'Delete Order History ❯'}
			</button>
			<hr className={classes.divider}/>
			<h2>Delete Account</h2>
			<p>Permanently delete your account. Your order history will be erased, and your login information will no longer work.</p>
			<FormSubmissionMessage
				submitSuccess={accountDeletionSuccess}
				submitError={accountDeletionError}
			/>
			<button
				className="btnDark"
				onClick={deleteAccountHandler}
				disabled={currentlyDeletingAccount}
			>
				{currentlyDeletingAccount ? 'Deleting Account...' : 'Delete Account ❯'}
			</button>
		</Card>
	</ProtectedRoute>
	)
}

export default AccountSettings;