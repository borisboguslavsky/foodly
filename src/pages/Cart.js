import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../components/Cart/CartItem";
import Card from "../components/UI/Card";

import classes from "./Cart.module.css";

import { cartActions } from "../store/cart-slice";

/**
 * Page that renders out the user cart, regardless of whether user is logged
 * in or not. Accessible from '/cart'
 */
const Cart = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalAmount = useSelector((state) => state.cart.totalAmount.toFixed(2));
	const items = useSelector((state) => state.cart.items);
	const cartHasItems = useSelector((state) => state.cart.items.length > 0);

	const cartItemRemoveHandler = (id) => {
		dispatch(cartActions.removeItemFromCart({ id: id }));
	};

	const cartItemAddHandler = (item) => {
		dispatch(cartActions.addItemToCart({ ...item, amount: 1 }));
	};

	const clearCartHandler = () => {
		dispatch(cartActions.clearCart())
	}

	const cartItemsList = (
		<ul className={classes.cartItems}>
			{items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Card title="Cart">
			{cartItemsList}
			{!cartHasItems && (
				<p>
				Your cart is currently empty.<br/> 
				Add some food from the <Link to="/menu">Menu!</Link>
				</p>
			)}
			{cartHasItems && (<>
				<hr />
				<div className={classes.total}>
					<div className={classes.totalAmount}>
						<span>Total: </span>
						<span>${totalAmount}</span>
					</div>
					<div className={classes.cartButtons}>
						<button 
							className="btnLight" 
							onClick={clearCartHandler}
							disabled={!cartHasItems}
						>
							Clear Cart
						</button>
						<button 
							className="btnDark" 
							onClick={() => navigate('/checkout')}
							disabled={!cartHasItems}
						>
							Checkout ❯
						</button>
					</div>
				</div>
			</>)}
		</Card>
	);
};

export default Cart;
