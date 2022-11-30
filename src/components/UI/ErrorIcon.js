import classes from "./ErrorIcon.module.css";

const ErrorIcon = (props) => {
	return (
		<div className={classes.errorIcon}>
			<span class="material-symbols-outlined">error</span>
			{props.text && <p>{props.text}</p>}
		</div>
	);
};

export default ErrorIcon;
