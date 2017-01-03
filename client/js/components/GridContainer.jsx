import './gridContainer.scss';

import React, { Component } from 'react';

import PhotoRowContainer from './PhotoRowContainer.jsx';
import { connect } from 'react-redux';

class GridContainer extends Component {

    constructor(props){
        super(props);

        this.chunks = this.chunks.bind(this);
    }

    chunks(summoners) {
        //chunks of 10
        const chunk = 10;
        var chunkArr = [];
        for(var i = 0; i < summoners.length; i+=10){
            chunkArr.push(summoners.slice(i, i+chunk));
        }
        return chunkArr;
    }

    render(){
        console.log('state of summoners:', this.props.summoners);
        console.log('chunks of summoners:', this.chunks(this.props.summoners));
        const summonerChunks = this.chunks(this.props.summoners);
        return(
            <div className="container">
                <div className="content">
                    {summonerChunks.map((summonerChunk,i) => {
                         return <PhotoRowContainer key={i} summoners={summonerChunk} />
                    })}
                </div>
            </div>

        )

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        summoners: state.searchedSummoners
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
