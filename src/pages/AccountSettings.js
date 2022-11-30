import { useState } from "react";
import { useSelector } from "react-redux";

import classes from './AccountSettings.module.css'

import Card from "../components/UI/Card";
import ProtectedRoute from '../components/ProtectedRoute'
import ChangePasswordForm from "../forms/ChangePasswordForm";
import FormSubmissionMessage from "../components/UI/FormSubmissionMessage";

import { deleteOrderHistory } from "../store/auth-actions";

/**
 * Account settings page that lets the user change their password,
 * delete their order history, and delete their account.
 */
const AccountSettings = () => {

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
		try {
			setCurrentlyDeletingOrders(true)
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

	}

	return(
	<ProtectedRoute check={isLoggedIn} redirect="/login">
		<Card title="Settings" className={classes.accountSettings}>
			<h2>Change Password</h2>
			<p>Use the form below to change the password for your account.</p>
			<ChangePasswordForm />
			<hr className={classes.divider}/>
			<h2>Clear Order History</h2>
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
				{currentlyDeletingAccount ? 'Deleting Account' : 'Delete Account ❯'}
			</button>
		</Card>
	</ProtectedRoute>
	)
}

export default AccountSettings;