import { Link, useNavigate } from 'react-router-dom';
import NavButton from '../NavigationBar/NavButton';

import classes from './Footer.module.css'

const Footer = () => {
	const navigate = useNavigate();

	return(
		<footer>
			<div className={`${classes.footerContent} width`}>
				<span>Created by <a href="https://github.com/borisboguslavsky" target="_blank">Boris Boguslavsky</a></span>
				<ul>
					{/* <Link to="/about">About</Link> */}
					<NavButton 
						icon="code"
						text="Source Code"
						className={classes.footerButton}
						onClick={() => {window.open('https://github.com/borisboguslavsky/foodly', '_blank')}}
					/>
					<NavButton 
						icon="question_mark"
						text="About"
						className={classes.footerButton}
						onClick={() => {navigate('/about')}}
					/>
				</ul>
			</div>
		</footer>
	)
}

export default Footer;