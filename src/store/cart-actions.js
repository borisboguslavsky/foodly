import { databaseUrl } from "../private-data"

export const placeOrder = async ({
	nameValue,
	user,
	email,
	addressLine1Value,
	addressLine2Value,
	zipcodeValue,
	cityValue,
	items,
	totalAmount
}) => {
	const timestamp = new Date();
	let year = timestamp.getFullYear()
	let month = (timestamp.getMonth()-1).toString();
	let day = timestamp.getDate();
	let hour = timestamp.getHours();
	let minute = timestamp.getMinutes();
	let second = timestamp.getSeconds();
	let millisecond = timestamp.getMilliseconds();

	if (month.toString().length === 1) month = "0" + month.toString();
	if (day.toString().length === 1) day = "0" + day.toString();
	if (minute.toString().length === 1) minute = "0" + minute.toString();
	if (second.toString().length === 1) second = "0" + second.toString();

	const endpoint = `${databaseUrl}orders/${user === 'guest' ? 'guest' : `user/${user}`}.json`

	const responseBody = {
		name: nameValue,
		user: user,
		date: {
			string: `${year}.${month}.${day}`,
			day: day,
			month: month,
			year: year
		},
		time: {
			string: `${hour}:${minute}:${second}:${millisecond}`,
			hour: hour,
			minute: minute,
			second: second,
			millisecond: millisecond
		},
		address: {
			addressLine1: addressLine1Value,
			addressLine2: addressLine2Value,
			zipcode: zipcodeValue,
			city: cityValue,
		},
		items: items,
		orderTotal: totalAmount
	}

	const response = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(responseBody)
	})
	const data = await response.json()
	// Response successfuly
	// if (response.ok) return [data, responseBody]
	if (response.ok) return responseBody
	// Some kind of error
	throw new Error(data.error || 'Order Submission Failed')

}