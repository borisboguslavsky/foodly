import classes from './FormSubmissionMessage.module.css'

/**
 * @param submitSuccess 
 * @param submitError 
 */
const FormSubmissionMessage = (props) => {
	if (props.submitSuccess) {
		return(
			<p className={classes.successMessage}>
				Success!
			</p>
		)
	}
	if (props.submitError) {
		return(
			<p className={classes.errorMessage}>
				Error: {props.submitError}
			</p>
		)
	}
}

export default FormSubmissionMessage