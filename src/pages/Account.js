import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Card from "../components/UI/Card";
import OrderHistoryItem from "../components/OrderHistoryItem";

import classes from './Account.module.css'

import { fetchOrders } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";

/**
 * Account page component, which renders out user order history, and 
 * allows users to change their passwords.
 */
const Account = () => {

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const uid = useSelector(state => state.auth.uid)
	const token = useSelector(state => state.auth.token)
	const email = useSelector(state => state.auth.email)
	
	const [isLoading, setIsLoading] = useState(false);
	const [fetchError, setFetchError] = useState(false);

	const orders = useSelector(state => state.auth.orders)
	const parsedOrders = Object.keys(orders).map(key => {
		// return <p>{JSON.stringify(orders[key])}</p>
		const order = orders[key]
		return(<OrderHistoryItem
			key={`pastOrder_${key}`}
			keyId={`pastOrder_${key}`}
			name={order.name}
			date={order.date}
			time={order.time}
			address={order.address}
			items={order.items}
			orderTotal={order.orderTotal}
		/>)
	})

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const orderData = await fetchOrders({userId: uid, token: token}) 
				dispatch(authActions.setUserOrders(orderData))
			} catch(error) {
				dispatch(authActions.setUserOrders({}))
				setFetchError(error.message || 'Error: Could not fetch orders...')
			}
			setIsLoading(false)
		}
		fetchData();
	}, [uid, token, email])

	return(
	<ProtectedRoute check={isLoggedIn} redirect="/login">
		<Card 
			title={`Welcome`}
			className={classes.accountPage}
		>
			<h2>Account Settings ({email})</h2>
			<p>Change your account password, delete your order history, or delete your entire account.</p>
			<button
				className="btnDark"
				style={{width: "fit-content"}}
				onClick={() => {navigate('/settings')}}
			>
				View Account Settings ❯
			</button>
			<hr style={{marginTop: '2rem'}} />
			<h2>Order History:</h2>
			{isLoading && <p>Fetching recent orders...</p>}
			{fetchError && <p>{fetchError}</p>}
			{Object.keys(orders).length === 0 && !isLoading && 
				<>
					<p>No recent orders...</p>
					<button
						className="btnDark"
						style={{width: "fit-content"}}
						onClick={() => {navigate('/menu')}}
					>
						View Menu ❯
					</button>
				</>
			}
			{Object.keys(orders).length > 0 && !isLoading && 
				<ul>{parsedOrders.reverse()}</ul>
			}
		</Card>
	</ProtectedRoute>
	)
}

export default Account;