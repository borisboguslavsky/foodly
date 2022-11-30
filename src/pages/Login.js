import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '../components/UI/Card'
import LoginForm from '../forms/LoginForm';

/**
 * The login page, where users can log in, or register.
 */
const Login = () => {

	const navigate = useNavigate();

	const userIsRegistering = useSelector(state => state.auth.userIsRegistering)
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
	
	useEffect(() => {
		if (isLoggedIn) navigate('/account', {replace: true})
	}, [isLoggedIn])

	return(
		<Card 
			title={`${userIsRegistering ? 'Sign Up' : 'Log In'}`}
		>
			<LoginForm />
		</Card>
	)
}

export default Login