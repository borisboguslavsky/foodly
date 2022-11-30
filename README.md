# Overview

Foodly is a demo/template Single-Page Web Application for a restaurant, built with React. Foodly features a responsive, mobile-friendly layout, a filter-able menu via URL search parameters, a cart and checkout system, and a user authentication system that grants access to an account page with order history for that account.
<br><br>

# Live demo

Foodly is currently live at https://foodly-b4352.web.app/menu<br>
<br>

# Features

* Responsive, mobile-friendly, and fast user interface.
* Menu filter system via URL search parameters.
* Cart and Checkout system.
* User Authentication system.
* Account page with order history.
<br><br>

# Tech stack

* [React.js](https://reactjs.org/) for the UI.
* [Redux](https://react-redux.js.org/) for state managment.
* [React Router](https://reactrouter.com/en/main) for routing.
* [CSS modules](https://github.com/css-modules/css-modules) to locally scope CSS and avoid style name collisions.
* [Firebase Realtime Database](https://firebase.google.com/docs/database) for the database.
* [Firebase Hosting](https://firebase.google.com/docs/hosting) for hosting.
* [Firebase Auth](https://firebase.google.com/docs/auth) for basic user authentication.
* [create-react-app](https://create-react-app.dev/) to bootstrap the whole thing.
<br><br>

# Setting up the dev environment

Foodly is pretty simple to set up, but does require a free Firebase account for the database, hosting, and user authentication.

## **Setting up the Frontend**

1. Download the respository.
2. Navigate to the repository directory in your terminal.
3. Run `npm install` to install required packages.
4. Run `npm start` to start the development server.<br>
The server should start at http://localhost/3000

## **Setting up the Backend**

Foodly requires a few things to be done for the backend before you can run it in dev mode. Foodly uses the **Firebase Realtime Database** for the backend and **Firebase Auth** for email/password user authentication, and **Firebase Hosting** to actually serve up files for users. A free Firebase account is needed, and these features have to be enabled in the Firebase console in order for Foodly to hook into them.

1. Create a [Firebase](https://firebase.google.com/) account with Google and create a new project in the Firebase console. Enable or disable Google Analytics as per your preference.
2. In the Firebase console, enable the **Firebase Realtime Database**.
<br>This database will store the menu items, as well as user and guest orders.
3. In the Firebase console, enable **Email/Password User Authentication**.
<br>Only email/password authentication is used in foodly, but feel free to implement whatever auth system you want.
4. Create a file inside of `/src` titled `private-data.js` with the following content:<br>
	```javascript
	export const firebaseApiKey = 'YOUR_FIREBASE_API_KEY'
	export const databaseUrl = 'YOUR_FIREBASE_REALTIME_DB_URL'
	```
	Replace the values for the above two constants with your own values. This will connect all the `fetch()` requests done by Foodly (for fetching user orders, or logging users in, etc...) to your specific Firebase account.

	* Your Realtime Database URL can be found in the realtime database section in the Firebase console. It might look something like this:<br>
	```https://project-a1234-default-rtdb.firebaseio.com/```
	* Your Api Key can be found in the project settings within the Firebase console.<br>
	```BJavYvCKsWMoXsBqLl2ZED32iuV2Fz1W9iwubrX```
	<br><br>
5. In the Firebase console, enable the **Firebase Hostring** and follow the setup instructions. During the initialization step, there are a couple of settings you need to specify below:
6. Initialize the project via `firebase init`
	<br>**Note:** Be sure to specify the `/build` folder as the folder to be deployed.
	<br>**Note:** When it asks about redirecting all links to `/index.html`, select **Yes** because this is a single page application, and all content is loaded via JS, not via server requests to other .html files.
	<br><br>If you messed this up during init, these options can also be set in the ***"hosting"*** options within the `firebase.json` file, which is created after running `firebase init`:
	```javascript
	"hosting": {
		"public": "build", // uploads files from /build during 'firebase deploy'
		"rewrites": [ // rewrites links to always point to index.html
			{
				"source": "**",
				"destination": "/index.html"
			}
		]
	}
	```

## **Deploying to Production**

1. Run `npm run build`
<br>This bundles and minifies all of the website code into just a few files for optimal loading. These optimized files are outputed to the `/build` directory.
2. Run `firebase deploy`
<br>This uploads the files inside of `/build` to your Firebase Hosting. The terminal will show you the URL where the site is now live.