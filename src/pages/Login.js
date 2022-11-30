import { useSelector } from 'react-redux';

import ProtectedRoute from '../components/ProtectedRoute';
import Card from '../components/UI/Card'
import LoginForm from '../forms/LoginForm';

/**
 * The login page, where users can log in, or register.
 */
const Login = () => {

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	const userIsRegistering = useSelector(state => state.auth.userIsRegistering)

	return(
	<ProtectedRoute check={!isLoggedIn} redirect="/account">
		<Card 
			title={`${userIsRegistering ? 'Sign Up' : 'Log In'}`}
		>
			<LoginForm />
		</Card>
	</ProtectedRoute>
	)
}

export default Login