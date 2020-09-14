import React from 'react';

const FoodItem = (props) => {
    const {name, price, picture} = props.item;
    console.log(props.item);
    return (
        <div className='p-3'>
            <img src={picture} alt=""/>
            <p>{name}</p>
            <p><small>How we dream about our future</small></p>
            <h5>${price}</h5>
        </div>
    );
};

export default FoodItem;