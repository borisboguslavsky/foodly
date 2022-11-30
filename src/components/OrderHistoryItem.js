import { useState } from 'react'
import classes from './OrderHistoryItem.module.css'

/**
 * @prop {string} key
 * @prop {string} name
 * @prop {object} date
 * @prop {object} address
 * @prop {object} time
 * @prop {array} items
 * @prop {number} orderTotal
 * @prop {boolean} expanded
 */
const OrderHistoryItem = (props) => {

	const [showDetails, setShowDetails] = useState(props.expanded ? props.expanded : false);

	const dateString = `${props.date.month}/${props.date.day}/${props.date.year}`

	const amOrPm = props.time.hour > 12 ? 'PM' : 'AM'
	let adjustedHour = amOrPm === 'PM' ? props.time.hour - 12 : props.time.hour
	if (adjustedHour === 0) adjustedHour = 12
	// const timeString = `${adjustedHour}:${props.time.minute}:${props.time.second} ${amOrPm}`
	const timeString = `${adjustedHour}:${props.time.minute} ${amOrPm}`

	const itemsInOrder = props.items.map((item, index) => {
		return(<li key={`${props.keyId}_${index}`}>
			<span>{item.amount}x </span>
			<span>{item.name}</span>
			<span> ... ${item.price}</span>
		</li>)
	})

	return(<li className={`${classes.pastOrderItem} ${props.noCard ? classes.noCard : ''}`}>
		<div className={classes.header}>
			<div>
				<h3>{dateString} — <span>{`$${props.orderTotal}`}</span></h3>
				<p>{timeString}</p>
			</div>
			{!props.noButton && <button 
				className='btnDark'
				onClick={() => {setShowDetails(bool => !bool)}}
			>
				{showDetails ? 'Less Info' : 'More Info'}
			</button>}
		</div>
		{showDetails && <>
			<hr/>
			<label>Items:</label>
			<ul>{itemsInOrder}</ul>
			<hr/>
			<label>Address:</label>
			<address>
				{props.name}<br/>
				{props.address.addressLine1} {props.address.addressLine2}<br/>
				{props.address.city}, {props.address.zipcode}
			</address>
		</>}
	</li>)
}

export default OrderHistoryItem;