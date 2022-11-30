import { useNavigate } from 'react-router-dom';
import classes from './Card.module.css';

/**
 * A general container component that can be optionally be configured to display
 * a title and a button next to the title to do some action. By default, the button
 * will just act as a 'back' button.
 * @prop {string} title - (optional) title to appear at the top of the card
 * @prop {string} buttonText - (optional) text that should be on the button
 * @prop {fn} buttonClickHandler - (optional) custom button click handler
 * @prop {bool} noButton - (optional) whether or not the button appears on the top right of the card
 * @prop {bool} className - (optional) additional css classes to add to the card
 */
const Card = props => {

  const navigate = useNavigate();
  
  const css = `${classes.card} ${props.className ? props.className : ''}`

  const goBackHandler = () => {
    navigate(-1)
  }
  
  return(
    <section className={css}>
      {props.title && 
        <div className={classes.cardTitle}>
          <h1>{props.title}</h1>
            {!props.noButton && 
            <button className="btnLight" onClick={props.buttonClickHandler ? props.buttonClickHandler : goBackHandler}>
              {props.buttonText ? props. buttonText : '❮ Back'}
            </button>}
        </div>
      }
      {props.title && <hr className={classes.cardTitleDivider}/>}
      {props.children}
    </section>
  )
};

export default Card;