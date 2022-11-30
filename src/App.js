import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/NavigationBar/Header';
import Root from './pages/Root';
import MissingPage from './pages/MissingPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Account from './pages/Account';
import About from './pages/About';
import Footer from './components/UI/Footer';

function App() {

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
          <Route path="/about" element={<About />} />
          <Route path="*" element={<MissingPage />}></Route>
        </Routes>
      </main>
    <Footer />
  </>);
}

export default App;
