import React, { useState } from 'react';
import FoodItemNav from '../FoodItemNav/FoodItemNav';
import fakeData from '../../fakeData/fakeData';
import FoodItem from '../FoodItem/FoodItem';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';

const Home = () => {
    const [item, setItem] = useState([])
    const handleItem = (item) => {
        const breakfastItem = fakeData.filter(data => data.category === item);
        setItem(breakfastItem);
    }
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className='my-4'>
                <FoodItemNav handleItem={handleItem}></FoodItemNav>
            </div>
            <div className='row d-flex justify-content-between mx-4'>
                {
                    item.map(item => <FoodItem key={item.name} item={item}></FoodItem>)
                }
            </div>
            <div className='text-center'>
               <button className='btn btn-light'>Checkout your food</button>
            </div>
        </div>
    );
};

export default Home;