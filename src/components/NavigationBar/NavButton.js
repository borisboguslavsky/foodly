import { useDispatch } from 'react-redux';
import classes from './NavButton.module.css'

import { uiActions } from '../../store/ui-slice';

/**
 * @prop {function} onClick - function to execute on button click
 * @prop {string} icon - name of the icon to display next to the button
 * @prop {string} text - text to display on the button
 */
const NavButton = (props) => {

  const dispatch = useDispatch();

  const passedCssClass = props.className ? props.className : ''
  const btnStyle = `${classes.navBtn} ${passedCssClass}`

  const clickHandler = () => {
    if (!props.noAutoHide) dispatch(uiActions.setMobileMenuVisibility(false))
    if (props.onClick) props.onClick()
  }

  return (
    <li id={props.id ? props.id : null} className={btnStyle}>
    <button onClick={clickHandler}>
      {props.icon && <span className="material-symbols-outlined">{props.icon}</span>}
      {props.text && <span>{props.text}</span>}
      {props.children}
    </button>
    </li>
  );
};

export default NavButton;
