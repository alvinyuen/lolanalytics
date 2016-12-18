import './card.scss';

import React, { Component } from 'react';




const Card = (props) => {
    return (
        <div className="shoe-container">
            <div className="shoe-card">
                    <div className="shoe-card-image" >
                    <img src={`https://d13yacurqjgara.cloudfront.net/users/31348/screenshots/3159743/4_teaser.jpg`}
                    />
                    </div>

                    <div className="shoe-card-info">
                        <div className="shoe-card-title">
                        Rogue One Cover
                        </div>


                        <div className="shoe-card-details">
                            <span className="shoe-view"><i className="ion-ios-eye-outline"></i>504</span>
                            <span className="shoe-chat"><i className="ion-ios-chatbubble"></i>8</span>
                            <span className="shoe-heart"><i className="icon ion-ios-heart"></i>35</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}



// https://d13yacurqjgara.cloudfront.net/users/31348/screenshots/3159743/4_teaser.jpg
// http://www.flightclub.com/media/catalog/product/cache/1/small_image/360x257/9df78eab33525d08d6e5fb8d27136e95/n/i/nike-free-40-flyknit-black-white-psn-green-ttl-orng-052637_1.jpg

export default Card;