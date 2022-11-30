import { firebaseApiKey, databaseUrl } from "../private-data";

export const userLoginOrSignup = async ({
	enteredEmail,
	enteredPassword,
	userIsRegistering,
}) => {
	const requestEndpoint = userIsRegistering ? 'signUp' : 'signInWithPassword'
	const requestURL = `https://identitytoolkit.googleapis.com/v1/accounts:${requestEndpoint}?key=${firebaseApiKey}`

	let response = await fetch(requestURL, {
		method: "POST",
		body: JSON.stringify({
			email: enteredEmail,
			password: enteredPassword,
			returnSecureToken: true,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
	const data = await response.json()
	// Response successfuly
	if (response.ok) return data;
	// Some kind of error
	let errorMessage = (data.error) ? 
		data.error.message : 'Authentication Failed'
	throw new Error(errorMessage)
};

export const fetchOrders = async ({
	userId,
	token
}) => {
	if (!userId) throw new Error('Missing userId in fetchOrders()')
	if (!token) throw new Error('Missing token in fetchOrders()')

	const requestURL = `${databaseUrl}/orders/user/${userId}.json?auth=${token}`

	let response = await fetch(requestURL)
	const data = await response.json()
	// Response successfuly
	if (response.ok) return data
	// Some kind of error
	let errorMessage = (data.error) ? 
		data.error.message : 'Failed to Fetch Orders'
	throw new Error(errorMessage)
};

export const changeUserPassword = async ({
	token,
	newPassword
}) => {
	const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`, {
		method: "POST",
		body: JSON.stringify({
			idToken: token,
			password: newPassword
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
	const data = await response.json();
	// Response successfuly
	if (response.ok) return data
	// Some kind of error
	let errorMessage = (data.error) ? 
		data.error.message : 'Failed to Fetch Orders'
	throw new Error(errorMessage)
}

export const deleteOrderHistory = async ({
	userId,
	token
}) => {
	if (!userId) throw new Error('Missing userId in fetchOrders()')
	if (!token) throw new Error('Missing token in fetchOrders()')

	const requestURL = `${databaseUrl}/orders/user/${userId}.json?auth=${token}`

	const response = await fetch(requestURL, {method: "DELETE" })
	const data = await response.json();
	// Response successfuly
	if (response.ok) return data
	// Some kind of error
	let errorMessage = (data.error) ? 
		data.error.message : 'Failed to Delete Orders'
	throw new Error(errorMessage)
}