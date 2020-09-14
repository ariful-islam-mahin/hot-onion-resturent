import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './FoodItem.css'

const FoodItem = (props) => {
    const {name, price, picture, category} = props.item;
    console.log(props.item);
    let history = useHistory();
    const handleClick = () => {
        history.push(`/${category}/${name}`)
    }
    return (
        <div className='m-3 text-center col-sm-3 '>
            <div onClick={handleClick} className=' p-3 rounded-lg item text-body'>
                <img className='w-50 py-3' src={picture} alt=""/>
                <h6>{name}</h6>
                <p><small>How we dream about our future</small></p>
                <h5>${price}</h5>
            </div>
        </div>
        
    );
};

export default FoodItem;