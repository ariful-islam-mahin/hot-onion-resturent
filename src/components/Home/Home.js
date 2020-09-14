import React, { useState } from 'react';
import FoodItemNav from '../FoodItemNav/FoodItemNav';
import fakeData from '../../fakeData/fakeData'
import FoodItem from '../FoodItem/FoodItem';

const Home = () => {
    const [item, setItem] = useState([])
    const handleItem = (item) => {
        const breakfastItem = fakeData.filter(data => data.category === item);
        setItem(breakfastItem);
    }
    return (
        <div>
            <FoodItemNav handleItem={handleItem}></FoodItemNav>
            {
                item.map(item => <FoodItem key={item.name} item={item}></FoodItem>)
            }
        </div>
    );
};

export default Home;