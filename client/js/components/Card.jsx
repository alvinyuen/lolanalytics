import './card.scss';

import React, { Component } from 'react';
import {Link} from 'react-router';



const Card = ({summoner}) => {

    return (
        <Link to={`/playerStats/${summoner.id}`}><div className="shoe-container">
            <div className="shoe-card">
                    <div className="shoe-card-image" >
                    <img
                    src={`http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/${summoner.profileIconId}.png`}
                    />
                    </div>

                    <div className="shoe-card-info">
                      <div className="shoe-card-title">
                        {summoner.name}
                        </div>
                        <div className="shoe-card-details">
                            <span className="shoe-view"><i className="ion-eye"></i>{summoner.views}</span>
                            <span className="shoe-chat"><i className="ion-ios-chatbubble"></i>8</span>
                            <span className="shoe-heart"><i className="icon ion-ios-heart"></i>{summoner.likes}</span>
                        </div>


                    </div>
            </div>
        </div></Link>
    )
}


export default Card;