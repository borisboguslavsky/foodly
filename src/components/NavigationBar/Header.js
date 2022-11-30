import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import mealsImage from '../../img/bg_header.jpg';

import headerCss from './Header.module.css';
import mobileNav from './MobileNavList.module.css'
import desktopNav from './DesktopNavList.module.css'

import CartButton from './CartButton';
import NavButton from './NavButton';

import { authActions } from '../../store/auth-slice';
import { uiActions } from '../../store/ui-slice';

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => !!state.auth.token)
  const showMobileMenu = useSelector(state => state.ui.showMobileMenu)

  const logoutHandler = () => {
    dispatch(authActions.logout())
    navigate('/logout')
  }

  const navigationButtons = <>
    <NavButton 
      text="Menu"
      className={`${desktopNav.navBtn_home} ${mobileNav.navBtn_home}`}
      onClick={() => {navigate('/')}}
      icon="home"
    />
    <CartButton 
      className={`${desktopNav.navBtn_cart} ${mobileNav.navBtn_cart}`} 
      hideOnMobile={true}
    />
    {!isLoggedIn && <NavButton 
      text="Log In"
      className={`${desktopNav.navBtn_login} ${mobileNav.navBtn_login}`}
      onClick={() => {navigate('/login')}}
      icon="login"
    />}
    {isLoggedIn && <NavButton 
      text="Account"
      className={`${desktopNav.navBtn_account} ${mobileNav.navBtn_account}`}
      onClick={() => {navigate('/account')}}
      icon="person"
    />}
    {isLoggedIn && <NavButton 
      text="Log Out"
      className={`${desktopNav.navBtn_logout} ${mobileNav.navBtn_logout}`}
      onClick={logoutHandler}
      icon="logout"
    />}
    <NavButton
      text="Menu"
      className={`${desktopNav.navBtn_menu} ${mobileNav.navBtn_menu}`}
      onClick={() => {dispatch(uiActions.toggleMobileMenu())}}
      icon="menu"
      noAutoHide={true}
    />
  </>

  return (
    <Fragment>
      <header className={headerCss.headerWrapper}>
        <nav className={`${headerCss.headerContent} width`}>
          <Link to="/" className={headerCss.headerLogo}>
            <img src="logo.svg" />
            <h1>Foodly</h1>
          </Link>
          <ul className={desktopNav.desktopNavList}>
            {navigationButtons}
          </ul>
          {showMobileMenu && <ul className={mobileNav.mobileNavList}>
            {navigationButtons}
          </ul>}
        </nav>
      </header>
      <div className={headerCss.backgroundImage}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
