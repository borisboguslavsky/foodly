import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

/**
 * @prop {expression} check - If this expression evluates to true, show the protected route, otherwise redirect 
 * @prop {string} redirect - where to redirect should expression be false
 */
const ProtectedRoute = (props) => {

	const navigate = useNavigate();

	// Redirect user if the check fails
	useEffect(() => {
		if (!props.check) {
			navigate(`${props.redirect ? props.redirect : '/'}`, {replace: true})
		}
	}, [props.check])

	// Load page content if check is passed
	return props.children
}

export default ProtectedRoute;