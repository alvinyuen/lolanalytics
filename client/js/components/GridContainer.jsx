import './gridContainer.scss';

import React, { Component } from 'react';

import PhotoRowContainer from './PhotoRowContainer.jsx';

export default class GridContainer extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="container">
                <div className="content">
                    <PhotoRowContainer />
                    <PhotoRowContainer />
                    <PhotoRowContainer />
                    <PhotoRowContainer />
                    <PhotoRowContainer />
                </div>
            </div>

        )

    }

}
