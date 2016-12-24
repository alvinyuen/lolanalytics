import './photoRowContainer.scss';

import React , { Component } from 'react';

import Card from './Card.jsx';



export default class PhotoRowContainer extends Component {

    render(){
        return (
            <div className="shoe-row grid clearfix">
                {this.props.summoners.map((summoner,i)=> {
                    return <Card key={i} summoner={summoner}/>
                })}
            </div>
            )
    }

}

