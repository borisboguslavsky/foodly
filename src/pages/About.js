import Card from "../components/UI/Card";

/**
 * Page explaining the various technical aspects of Foodly.
 */
const About = () => {
	return(
		<Card title="About">
			<p>
        Foodly is a demo/template Single-Page Web Application for a restaurant, built with React. Foodly features a responsive, mobile-friendly layout, a filter-able menu via URL search parameters, a cart and checkout system, and a user authentication system that grants access to an account page with order history for that account.
      </p>
			<p>
				Foodly uses the following technologies and libraries:
			</p>
			<ul>
				<li>
					<a href="https://reactjs.org/" target="_blank">React.js</a> for the UI.
				</li>
				<li>
					<a href="https://react-redux.js.org/" target="_blank">Redux</a> for state managment.
				</li>
				<li>
					<a href="https://reactrouter.com/en/main" target="_blank">React Router</a> for routing.
				</li>
				<li>
					<a href="https://github.com/css-modules/css-modules" target="">CSS modules</a> to scope CSS and avoid style name collisions.
				</li>
				<li>
					<a href="https://firebase.google.com/docs/database" target="_blank">Firebase Realtime Database</a> for the database.
				</li>
				<li>
					<a href="https://firebase.google.com/docs/hosting" target="_blank">Firebase Hosting</a> for hosting.
				</li>
				<li>
					<a href="https://firebase.google.com/docs/auth" target="_blank">Firebase Authentication</a> for basic user authentication.
				</li>
			</ul>
			<p>
				The source code is available at the <a href="https://github.com/borisboguslavsky/foodly" target="_blank">Github repository</a>.
			</p>
		</Card>
	)
}

export default About;