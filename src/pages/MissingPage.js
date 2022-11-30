import { useNavigate } from 'react-router-dom'
import Card from '../components/UI/Card'

/**
 * Page that renders as a fallback 404 page when react router cannot otherwise
 * find a route for the URL.
 */
const MissingPage = () => {

	const navigate = useNavigate();

	return(
		<Card 
			title="404: Page Not Found!"
			buttonText="❮ Home"
			buttonClickHandler={() => {navigate('/menu')}}
		>
			<p><b>{window.location.href}</b> does not exist!</p>
		</Card>
	)
}

export default MissingPage