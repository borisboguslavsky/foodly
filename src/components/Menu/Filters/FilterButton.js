import { Link, useLocation } from "react-router-dom";

import classes from "./FilterButton.module.css";

/**
 * @prop {string} name - text thats on the filter button
 * @prop {string} tabId - string that corresponds to the menu item category, 
 * and appears as the search parameter string in the URL
 * @prop {bool} activeByDefault - determines if the filter button is the active filter
 * if no other filters are selected, or when the page is first loaded
 */
const FilterButton = (props) => {

	const location = useLocation();

	const filter = new URLSearchParams(location.search).get('filter')
	let isActive = filter == props.tabId ? true : false;
	if (filter === null) isActive = props.activeByDefault ? true : false

	const buttonClass = `${classes.filterButton} ${isActive ? classes.active : ""}`;

	return (
		<li className={buttonClass} >
			<Link to={`?filter=${props.tabId}`}>
				{props.name}
			</Link>
		</li>
	);
};

export default FilterButton;
