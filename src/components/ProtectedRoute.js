import { Navigate } from "react-router-dom"

/**
 * @prop {expression} validation - If this expression evluates to true, show the protected route, otherwise redirect 
 * @prop {string} redirect - where to redirect should expression be false
 */
const ProtectedRoute = (props) => {
	if (!props.validation) {
		return(
			<Navigate to={`${props.redirect ? props.redirect : '/'}`} />
		)
	}
	return props.children
}

export default ProtectedRoute;