import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';

const FoodDetails = () => {
    let { foodName } = useParams();
    const [details, setDetails] = useState({})
    
    const foodDetails = fakeData.find(data => data.name === foodName);
    setDetails(foodDetails)

    console.log(details)
    
    return (
        <div>
            <h2>I am food details:  </h2>
        </div>
    );
};

export default FoodDetails;