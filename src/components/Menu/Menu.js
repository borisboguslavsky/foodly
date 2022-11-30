import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import classes from './Menu.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';
import Card from '../UI/Card';
import MenuItem from './MenuItem/MenuItem';

import { fetchMenu } from '../../store/menu-actions';
import ErrorIcon from '../UI/ErrorIcon';

const Menu = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  
  const menuItems = useSelector(state => state.menu.items)
  const isLoading = useSelector(state => state.menu.isLoading)
  const mealsFetchError = useSelector(state => state.menu.hasError)
  
  // Loads the menu from the firebase db on initial render
  useEffect(() => {
    dispatch(fetchMenu())
  }, [])
  
  let filter = new URLSearchParams(location.search).get('filter')
  const filterMealsByActiveCatgory = (meal) => {
    if (filter === null || filter === 'all') return true;
    if (meal.category === filter) return true;
    return false;
  }

  let parsedMeals = [];
  if (menuItems.length > 0) {
    parsedMeals = menuItems
      .filter(filterMealsByActiveCatgory)
      .map((meal) => (
        <MenuItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          category={meal.category}
          price={meal.price}
          image={meal.image}
        />
    ));
}

  return (
    <Card>
      {isLoading && (
        <LoadingSpinner 
          color='var(--red)' 
          size="2.75rem" 
          thickness="5px" 
          text='Loading...'
        />
      )}
      {!isLoading && parsedMeals.length > 0 && !mealsFetchError && (
        <ul className={classes.menuList}>
          {parsedMeals}
        </ul>
      )}
      {!isLoading && parsedMeals.length === 0 && (
        <ErrorIcon text="Menu failed to load from database..."/>
      )}
      {mealsFetchError && (
        <ErrorIcon text="Error..."/>
      )}
    </Card>
  );
};

export default Menu;
