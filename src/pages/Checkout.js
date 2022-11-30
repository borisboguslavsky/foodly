import { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../components/UI/Card";
import OrderHistoryItem from "../components/OrderHistoryItem";
import CheckoutForm from "../forms/CheckoutForm";

/**
 * The checkout page, accessible from '/checkout'
 * Renders out an order summary of the cart, and a checkout address form.
 */
const Checkout = () => {

	const items = useSelector(state => state.cart.items)
	const totalAmount = useSelector(state => state.cart.totalAmount)
	const [submittedOrder, setSubmittedOrder] = useState(undefined)
	const itemsList = items.map((item, index) => {
		return(
			<span 
				key={`checkoutItemList_${index}`} 
				style={{display: "block"}}
			>
				{item.amount}x {item.name}: ${item.amount * item.price}
			</span>	
		)
	})
	
	// If an order has been placed, render a 'Order Submitted' page
	if (submittedOrder) {
		return(
			<Card title="Order Submitted">
				<OrderHistoryItem 
					keyId={`lastOrder`}
					name={submittedOrder.name}
					date={submittedOrder.date}
					time={submittedOrder.time}
					address={submittedOrder.address}
					items={submittedOrder.items}
					orderTotal={submittedOrder.orderTotal}
					expanded={true}
					noCard={true}
					noButton={true}
				/>
			</Card>
		)
	}

	// If checking out, show an order summary, and the checkout form.
	return (
		<Card title="Checkout">
			<div>
				<h2>Order Summary:</h2>
				<p>{itemsList}</p>
				<p style={{fontWeight: "bold", color: "var(--red)"}}>Total: ${totalAmount}</p>
			</div>
			{items.length > 0 && <CheckoutForm 
				setSubmittedOrder={setSubmittedOrder}
			/>}
		</Card>
	);
}

export default Checkout;