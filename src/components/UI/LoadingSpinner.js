import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
	const wrapperStyle = {
		position: `${props.position || 'relative'}`,
	}
	const style = {
		width: `${props.size || '44px'}`,
		height: `${props.size || '44px'}`,
		borderColor: `${props.color || '#fff'} transparent transparent transparent`,
		borderWidth: `${props.thickness || '6px'}`,
		margin: `${props.margin || '6px'}`
	}
	return (
		<div style={wrapperStyle} className={classes.wrapper}>
			<div className={classes.spinner} style={{height: `${props.size || '44px'}`, width: `${props.size || '44px'}`}}>
				<div style={style}></div>
				<div style={style}></div>
				<div style={style}></div>
				<div style={style}></div>
			</div>
			{props.text && <p>{props.text || "Loading"}</p>}
		</div>
	);
};

export default LoadingSpinner;
