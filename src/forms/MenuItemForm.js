import { useRef, useState } from 'react';

import formStyle from './MenuItemForm.module.css'

const MenuItemForm = (props) => {
  const [amount, setAmount] = useState(1);

  const addHandler = (event) => {
    event.preventDefault();
    const newAmount = amount + 1 <= 10 ? amount + 1 : 10
    setAmount(newAmount)
  }
  
  const subtractHandler = (event) => {
    event.preventDefault();
    const newAmount = amount - 1 >= 1 ? amount - 1 : 1
    setAmount(newAmount)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(amount);
  };

  return (
    <form className={formStyle.menuItemForm} onSubmit={submitHandler}>
      <div>
        <input 
          type="text"
          value={'x' + amount}
          onChange={(e) => {setAmount(e.target.value)}}
        />
        <button className="btnLight" onClick={subtractHandler}>−</button>
        <button className="btnLight" onClick={addHandler}>+</button>
      </div>
      <button className="btnDark">
        <span className="material-symbols-outlined">add_shopping_cart</span>
        <span>Add to cart</span>
      </button>
    </form>
  );
};

export default MenuItemForm;
