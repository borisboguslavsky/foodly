import FilterButton from "./FilterButton"

import classes from './FilterRow.module.css'

const FilterRow = () => {
	return(
		<ul className={`${classes.filterRow}`}>
			<FilterButton name={"All"} tabId={"all"} activeByDefault/>
			<FilterButton name={"Breakfast"} tabId={"breakfast"}/>
			<FilterButton name={"Lunch / Dinner"} tabId={"lunch_dinner"}/>
			<FilterButton name={"Dessert"} tabId={"dessert"}/>
		</ul>
	)
}	

export default FilterRow;