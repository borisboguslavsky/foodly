import Card from "../components/UI/Card";
import ProtectedRoute from '../components/ProtectedRoute'

import classes from './AccountSettings.module.css'
import ChangePasswordForm from "../forms/ChangePasswordForm";
import { useSelector } from "react-redux";

const deleteOrderHistoryHandler = () => {

}

const deleteAccountHandler = () => {

}

const AccountSettings = () => {

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

	return(
	<ProtectedRoute check={isLoggedIn} redirect="/login">
		<Card title="Settings" className={classes.accountSettings}>
			<h2>Change Password</h2>
			<p>Use the form below to change the password for your account.</p>
			<ChangePasswordForm />
			<hr className={classes.divider}/>
			<h2>Clear Order History</h2>
			<p>Permanently delete your entire order history.</p>
			<button
				className="btnDark"
				onClick={deleteOrderHistoryHandler}
				disabled
			>
				Delete Order History ❯
			</button>
			<hr className={classes.divider}/>
			<h2>Delete Account</h2>
			<p>Permanently delete your account. Your order history will be erased, and your login information will no longer work.</p>
			<button
				className="btnDark"
				onClick={deleteAccountHandler}
				disabled
			>
				Delete Account ❯
			</button>
		</Card>
	</ProtectedRoute>
	)
}

export default AccountSettings;