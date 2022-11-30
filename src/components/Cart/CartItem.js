import classes from './CartItem.module.css';

/**
 * This component renders out items in the cart page, summarizing the users' order.
 * This component is rendered in a .map() function from the global cart.items state.
 * Used within the <Cart> page
 * @prop {number} price - the amount of money the item costs
 * @prop {string} name - the name of the item
 * @prop {number} amount - the quantity of the item in the cart
 * @prop {fn} onAdd - '+' button click handler function
 * @prop {fn} onRemove - '-' button click handler function
 */
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.cartItem}>
      <div className={classes.itemName}>
        <h2>{props.name}</h2>
        <span className={classes.price}>{price}</span>
      </div>
      <div className={classes.addRemoveButtons}>
        <span className={classes.amount}>x{props.amount}</span>
        <button onClick={props.onRemove} className="btnLight">−</button>
        <button onClick={props.onAdd} className="btnLight">+</button>
      </div>
    </li>
  );
};

export default CartItem;
