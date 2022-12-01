import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/NavigationBar/Header';
import Root from './pages/Root';
import MissingPage from './pages/MissingPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Account from './pages/Account';
import AccountSettings from './pages/AccountSettings';
import About from './pages/About';
import Footer from './components/UI/Footer';

import { authActions } from './store/auth-slice';

function App() {

  const dispatch = useDispatch();
  const expirationTime = useSelector(state => state.auth.expirationTime)

  // Set timer to auto logout user if they're logged in from localStorage
  useEffect(() => {
    const currentTime = new Date().getTime()
    if (!expirationTime) return;
    const remainingTime = expirationTime - currentTime;
    // Log out automatically if time left is less than a minutes
    if (remainingTime <= 60000) {
      dispatch(authActions.logout())
      return
    } 
    console.log(`Auth token expires in: ${remainingTime}ms (${(remainingTime/1000)/60} minutes)`)
    const logoutTimer = setTimeout(() => {
      dispatch(authActions.logout())
    }, remainingTime)
    dispatch(authActions.setLogoutTimer(logoutTimer))
  }, [])

  return (<>
    <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/menu" />} />
          <Route path="/menu" element={<Root />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<MissingPage />}></Route>
        </Routes>
      </main>
    <Footer />
  </>);
}

export default App;
