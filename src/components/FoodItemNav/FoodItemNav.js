import React from 'react';
import { Link } from 'react-router-dom';

const FoodItemNav = (props) => {
    return (
        <div className='text-center'>
            <button className='btn' onClick={() => props.handleItem('breakfast')}>Breakfast</button>
            <button className='btn' onClick={() => props.handleItem('lunch')}>Lunch</button>
            <button className='btn' onClick={() => props.handleItem('dinner')}>Dinner</button>
        </div>
    );
};

export default FoodItemNav;