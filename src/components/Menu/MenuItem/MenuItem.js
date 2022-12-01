import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./MenuItem.module.css";

import MenuItemForm from "../../../forms/MenuItemForm";

const MenuItem = (props) => {
	
	const dispatch = useDispatch();

	const price = `$${props.price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		dispatch(
			cartActions.addItemToCart({
				id: props.id,
				name: props.name,
				amount: amount,
				price: props.price,
			})
		);
	};


	return (
		<li className={classes.meal}>
			<div className={classes.image}>
				<img src={`meals/${props.category}/${props.image}`} loading="lazy" />
				<LoadingSpinner
					color="white"
					thickness="3px"
					size="32px"
					position="absolute"
				/>
			</div>
			<div className={classes.mealText}>
				<h3>
					<span className={classes.title}>{props.name}</span>
					<span className={classes.price}>{price}</span>
				</h3>
				<div className={classes.description}>{props.description}</div>
			</div>
			<MenuItemForm onAddToCart={addToCartHandler} />
		</li>
	);
};

export default MenuItem;
