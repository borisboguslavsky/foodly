import { useState } from "react";

const useTextInputField = (validate) => {
	/**
	 * Custom hook used to outsource the checkout form input field logic and state.
	 * @param {function} validate - Validation function used to determine the isValid const.
	 */

	const [value, setValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const isValid = validate ? validate(value) : true;
	// console.log(value + 'is valid: ' + isValid)
	const hasError = !isValid && isTouched;
	// console.log('hasError: ' + hasError)

	const onChangeHandler = (event) => {
		setValue(event.target.value);
		console.log('Input value set to: ' + event.target.value)
	};

	const onBlurHandler = (event) => {
		setIsTouched(true);
		console.log('Input blurred...')
	};

	const reset = () => {
		setValue("");
		setIsTouched(false);
	};

	return {
		value,
		isValid,
		hasError,
		onChangeHandler,
		onBlurHandler,
		reset,
	};
};

export default useTextInputField;
