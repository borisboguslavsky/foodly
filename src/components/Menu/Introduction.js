import { useNavigate } from 'react-router-dom';

import Card from '../UI/Card';

import classes from './Introduction.module.css';

const Introduction = () => {
  
  const navigate = useNavigate();

  return (
    <Card 
      title="Fresh Food, Delivered Asynchronously"
      className={`${classes.introduction}`}
      // noButton={true}
      buttonText="About ❯"
      buttonClickHandler={() => navigate('/about')}
    >
      <p>
      Foodly is a demo/template Single-Page Web Application for a restaurant, built with React. Foodly features a responsive, mobile-friendly layout, a filter-able menu via URL search parameters, a cart and checkout system, and a user authentication system that grants access to an account page with order history for that account.
      </p>
    </Card>
  );
};

export default Introduction;
