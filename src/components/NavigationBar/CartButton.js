import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './NavButton.module.css';
import NavButton from './NavButton';


const CartButton = (props) => {

  const navigate = useNavigate();

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const items = useSelector(state => state.cart.items)
  const totalNumberOfItemsInCart = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonStyle = `${props.className ? props.className : ''} ${btnIsHighlighted ? classes.bump : ''}`

  return (
    <NavButton
      text="Your Cart"
      icon="shopping_cart"
      onClick={() => navigate('/cart')}
      className={buttonStyle}
      hideOnDesktop={props.hideOnDesktop}
      hideOnMobile={props.hideOnMobile}
    >
      <span className={classes.badge}>{totalNumberOfItemsInCart}</span>
    </NavButton>
  );
};

export default CartButton;
