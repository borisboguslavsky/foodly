import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '../components/UI/Card'

import { authActions } from '../store/auth-slice';

/**
 * The logout page, shown on logging out, or if navigated to directly,
 * shows the user which email they are logged in as and offers them
 * the option of logging out.
 */
const Logout = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const email = useSelector(state => state.auth.email)

	const logoutHandler = () => {
		dispatch(authActions.logout())
	}
	
	const anotherAccountHandler = () => {
		dispatch(authActions.logout())
		navigate('/login')
	}

	if (isLoggedIn) return(
		<Card
			title='Log Out'
		>
			<p>You are currently logged in as {email}.</p>
			<button 
				className='btnDark' 
				style={{width: "max-content"}}
				onClick={logoutHandler}
			>
				Log Out ❯
			</button>
		</Card>
	)

	return(
		<Card 
			title={`${!isLoggedIn ? 'Logged Out' : 'Log Out'}`}
		>
			<p>You are now logged out.</p>
			<button 
				className='btnDark' 
				style={{width: "max-content"}}
				onClick={() => {navigate('/login')}}
			>
				Log In ❯
			</button>
		</Card>
	)
}

export default Logout