import './gridContainer.scss';

import React, { Component } from 'react';

import PhotoRowContainer from './PhotoRowContainer.jsx';
import { connect } from 'react-redux';

import { updateSearchedSummonersWithOptions } from '../redux/searchedSummoners';
import { updateSummonerCount, updateGameCount, updateChampionNames} from '../redux/summary';

class GridContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedRegion: 'ALL',
            selectedChampion: 'ALL'
        }

        this.chunks = this.chunks.bind(this);
        this.selectRegion = this.selectRegion.bind(this);
        this.selectChampion = this.selectChampion.bind(this);
    }

    componentDidMount(){
        this.props.updateSummonerCount();
        this.props.updateGameCount();
        this.props.updateChampionNames();
    }

    selectRegion(e){
        this.setState({selectedRegion: e.target.value});
        this.props.updateSearchedSummonersWithOptions(e.target.value, this.state.selectedChampion);
    }

    selectChampion(e){
        this.setState({selectedChampion: e.target.value});
        this.props.updateSearchedSummonersWithOptions(this.state.selectedRegion, e.target.value);
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
        // console.log('state of summoners:', this.props.summoners);
        // console.log('chunks of summoners:', this.chunks(this.props.summoners));
        const summonerChunks = this.chunks(this.props.summoners);
        return(
            <div className="mainContainer">
                &nbsp;
                <div className="barContainer clearfix">

                    <div className="summaryBox">
                        Summoner count : {this.props.summonerCount}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        Game count : {this.props.gameCount}
                    </div>
                    <div className="selectors">
                        <label>Region :</label>
                        <select size="3" className="regionSelector" onChange={this.selectRegion}>
                            <option value="ALL"> All Regions </option>
                            <option value="NA"> North America </option>
                            <option value="JP"> Japan </option>
                        </select>
                        <label >Champion :</label>
                            <select size="3" className="championSelector" onChange={this.selectChampion}>
                                <option value="ALL"> All Champions </option>
                                {this.props.championNames.map((champion,i)=> {
                                return <option key={i}>{champion.name}</option>
                                })}
                            </select>

                    </div>
                </div>

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
        summoners: state.searchedSummoners,
        summonerCount: state.summonerCount,
        gameCount: state.gameCount,
        championNames: state.championNames
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateSearchedSummonersWithOptions: (region, championName) => dispatch(updateSearchedSummonersWithOptions(region, championName)),
        updateSummonerCount: () => dispatch(updateSummonerCount()),
        updateGameCount: () => dispatch(updateGameCount()),
        updateChampionNames: () => dispatch(updateChampionNames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
