import React from "react";

export const Product = (props) => {
    const { name, price, description, img1, img2, img3 } = props.data;
    return (
        <div className="product"> 
            <div className="slide-var">
                <ul>
                    <li><img src={img1} alt={name}/></li>
                    <li><img src={img2} alt={name}/></li>
                    <li><img src={img3} alt={name}/></li>
                </ul>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{name}</b> 
                </p>
                <p> ${price}</p>
            </div>
        </div> 
    );
};
