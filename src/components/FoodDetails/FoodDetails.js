import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const FoodDetails = () => {
    let { foodName } = useParams();
    let history = useHistory()
    
    const foodDetails = fakeData.find(data => data.name === foodName);
    // setDetails(foodDetails)

    console.log(foodDetails);

    const {name, price, picture} = foodDetails

    const handleClick = () => {
        history.push('/checkout')
    }
    return (
        <div className="row d-flex justify-content-center align-items-center mt-5">
            <div className="col-sm-4">
                <h2>{name}</h2>
                <p><small> Gay one the what walk then she. Demesne mention promise you justice arrived way. Amazing foods are Or and increasing to in especially inquietude companions acceptance admiration. Outweigh it families distance wandered ye</small></p>
                <h3>${price}</h3>
                <button onClick={handleClick} className='btn btn-danger rounded-pill px-4 mt-4'><FontAwesomeIcon  icon={faShoppingCart} /> Add</button>
            </div>
            <div className="col-sm-4">
                <img className='w-100' src={picture} alt=""/>
            </div>
        </div>
    );
};

export default FoodDetails;