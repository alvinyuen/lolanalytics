import './playerStatsContainer.scss';

import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
require('highcharts-more')(ReactHighcharts.Highcharts);
import ReactDOM from 'react-dom';

    // //general
    // gameMode: {type: Sequelize.STRING},
    // gameType: {type: Sequelize.STRING},
    // subType: {type: Sequelize.STRING},
    // championId: {type: Sequelize.INTEGER},

    // //general stats
    // championsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    // numDeaths: {type: Sequelize.INTEGER, defaultValue: 0},
    // assists : {type: Sequelize.INTEGER, defaultValue: 0},
    // win : {type: Sequelize.BOOLEAN,},

    // //push
    // turretsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    // totalDamageDealtToBuildings: {type: Sequelize.INTEGER, defaultValue: 0},

    // //farm
    // minionsKilled: {type: Sequelize.INTEGER, defaultValue: 0},
    // goldEarned: {type: Sequelize.INTEGER, defaultValue: 0},

    // //jungle
    // neutralMinionsKilled : {type: Sequelize.INTEGER, defaultValue: 0},

    // //fighter
    // totalDamageDealt : {type: Sequelize.INTEGER, defaultValue: 0},
    // totalDamageTaken : {type: Sequelize.INTEGER, defaultValue: 0},
    // killingSprees : {type: Sequelize.INTEGER, defaultValue: 0},
    // largestKillingSpree : {type: Sequelize.INTEGER, defaultValue: 0},

    // //versatile
    // wardKilled : {type: Sequelize.INTEGER, defaultValue: 0},
    // wardPlaced: {type: Sequelize.INTEGER, defaultValue: 0},
    // visionWardsBought: {type: Sequelize.INTEGER, defaultValue: 0},

var config = {
    chart: {
            polar: true,
            type: 'line',
            width: 420,
            backgroundColor: '#f4f4f4'
        },
        title: {
            text: null,
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['Kill', 'Death', 'Assist', 'Turrets Killed',
                    'Damage To Building', 'Minions Killed', 'Gold Earned', 'Neutral Minions Killed',
                    'Total Damage', 'Total Damage Taken', 'Largest Killing Spree', 'Ward Killed', 'Ward Placed', 'Vision Wards Bought'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: false,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        series: [{
            name: 'Actual',
            data: [43000, 19000, 60000, 35000, 17000, 10000, 12424,64992, 60214, 20391, 20200, 30333, 55555, 20591],
            pointPlacement: 'on'
        }, {
            name: 'Average',
            data: [50000, 39000, 42000, 31000, 26000, 14000, 12509, 12509, 93406, 34069, 9346, 22946, 19236],
            pointPlacement: 'on'
        }]


};

export default class ReactHighChart extends Component {
    render(){
       return <ReactHighcharts config = {config}></ReactHighcharts>
    }
}