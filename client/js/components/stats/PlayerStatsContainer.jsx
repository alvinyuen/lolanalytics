import './playerStatsContainer.scss';

import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
require('highcharts-more')(ReactHighcharts.Highcharts);
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { findRegionAverageByRole, findPlayerAverageByRole, findRegionAverageByRoleMainStats, findPlayerAverageByRoleMainStats } from '../../redux/singleSummoner';

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

// var config = {
//     chart: {
//             polar: true,
//             type: 'line',
//             width: 400,
//             backgroundColor: '#fff'
//         },
//         title: {
//             text: 'MID',
//             // x: -80
//         },
//         pane: {
//             size: '80%'
//         },
//         xAxis: {
//             categories: ['Kill', 'Death', 'Assist', 'Turrets Killed',
//                     'Damage To Building', 'Minions Killed', 'Gold Earned', 'Neutral Minions Killed',
//                     'Total Damage', 'Total Damage Taken', 'Largest Killing Spree', 'Ward Killed', 'Ward Placed', 'Vision Wards Bought'],
//             tickmarkPlacement: 'on',
//             lineWidth: 0
//         },
//         yAxis: {
//             gridLineInterpolation: 'polygon',
//             lineWidth: 0,
//             min: 0
//         },
//         tooltip: {
//             shared: false,
//             pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
//         },
//         series: [{
//             name: 'Player',
//             data: [43000, 19000, 60000, 35000, 17000, 10000, 12424,64992, 60214, 20391, 20200, 30333, 55555, 20591],
//             pointPlacement: 'on'
//         }, {
//             name: 'Average',
//             data: [50000, 39000, 42000, 31000, 26000, 14000, 12509, 12509, 93406, 34069, 9346, 22946, 19236],
//             pointPlacement: 'on'
//         }]
// };

// var barConfig = {
// chart: {
//         type: 'bar'
//         },
//         title: {
//             text: 'Player Stats'
//         },
//         subtitle: {
//             text: ''
//         },
//         xAxis: {
//             categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
//             title: {
//                 text: null
//             }
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: 'Population (millions)',
//                 align: 'high'
//             },
//             labels: {
//                 overflow: 'justify'
//             }
//         },
//         tooltip: {
//             valueSuffix: ' millions'
//         },
//         plotOptions: {
//             bar: {
//                 dataLabels: {
//                     enabled: true
//                 }
//             }
//         },
//         legend: {
//             layout: 'vertical',
//             align: 'right',
//             verticalAlign: 'top',
//             x: -40,
//             y: 80,
//             floating: true,
//             borderWidth: 1,
//             shadow: true
//         },
//         credits: {
//             enabled: false
//         },
//         series: [{
//             name: 'Year 1800',
//             data: [107, 31, 635, 203, 2]
//         }, {
//             name: 'Year 1900',
//             data: [133, 156, 947, 408, 6]
//         }, {
//             name: 'Year 2012',
//             data: [1052, 954, 4250, 740, 38]
//         }]
// }


class ReactHighChart extends Component {

    componentWillMount(){
        this.props.findRegionAverageByRole();
        // console.log('COMPONENT WILL MOUNT:', this.props)
        this.props.findPlayerAverageByRole(this.props.params.summonerId);
        this.props.findPlayerAverageByRoleMainStats(this.props.params.summonerId);
        this.props.findRegionAverageByRoleMainStats();
    }






    render(){
        // console.log('averageRegionMainStats', this.props.averageRegionMainStats);
        // console.log('averagePlayerMainStats', this.props.averagePlayerMainStats);

        /* main stats */
        const supportMainStats = this.props.averageRegionMainStats.filter(role => role.role === 'SUPPORT');
        let supportMainStatsClone = Object.assign({}, supportMainStats[0])
        delete supportMainStatsClone.role;
        let regionSupportMainStats = Object.values(supportMainStatsClone).map(val => parseInt(val));

        const carryMainStats = this.props.averageRegionMainStats.filter(role => role.role === 'CARRY');
        let carryMainStatsClone = Object.assign({}, carryMainStats[0])
        delete carryMainStatsClone.role;
        let regionCarryMainStats = Object.values(carryMainStatsClone).map(val => parseInt(val));

        const jungleMainStats = this.props.averageRegionMainStats.filter(role => role.role === 'JUNGLE');
        let jungleMainStatsClone = Object.assign({}, jungleMainStats[0])
        delete jungleMainStatsClone.role;
        let regionJungleMainStats = Object.values(jungleMainStatsClone).map(val => parseInt(val));

        const midMainStats = this.props.averageRegionMainStats.filter(role => role.role === 'MID');
        let midMainStatsClone = Object.assign({}, midMainStats[0])
        delete midMainStatsClone.role;
        let regionMidMainStats = Object.values(midMainStatsClone).map(val => parseInt(val));

        const topMainStats = this.props.averageRegionMainStats.filter(role => role.role === 'TOP');
        let topMainStatsClone = Object.assign({}, topMainStats[0])
        delete topMainStatsClone.role;
        let regionTopMainStats = Object.values(topMainStatsClone).map(val => parseInt(val));

        console.log('REGION CARRY MAIN STATS', regionCarryMainStats);


        /* other stats */
        const supportStats = this.props.averageRegionStats.filter(role => role.role === 'SUPPORT');
        let supportStatsClone = Object.assign({}, supportStats[0])
        delete supportStatsClone.role;
        let regionSupportStats = Object.values(supportStatsClone).map(val=> val * 1 );
        const carryStats = this.props.averageRegionStats.filter(role =>  role.role === 'CARRY');
        let carryStatsClone = Object.assign({}, carryStats[0]);
        delete carryStatsClone.role;
        let regionCarryStats = Object.values(carryStatsClone).map(val=> val * 1 );
        const jungleStats = this.props.averageRegionStats.filter(role => role.role === 'JUNGLE');
        let jungleStatsClone = Object.assign({}, jungleStats[0]);
        delete jungleStatsClone.role;
        let regionJungleStats = Object.values(jungleStatsClone).map(val=> val * 1 );
        const midStats = this.props.averageRegionStats.filter(role => role.role === 'MID');
        let midStatsClone = Object.assign({}, midStats[0]);
        delete midStatsClone.role;
        let regionMidStats = Object.values(midStatsClone).map(val=> val * 1 );
        const topStats = this.props.averageRegionStats.filter(role => role.role === 'TOP');
        let topStatsClone = Object.assign({}, topStats[0]);
        delete topStatsClone.role;
        let regionTopStats = Object.values(topStatsClone).map(val=> val * 1 );


       return (
           <div className="playerContainer clearfix">
            &nbsp;
            <div>
            <div className="statLabel"> General Statistics </div>
            {this.props.averagePlayerStats.map((player, i) => {
                const categories = Object.keys(player).filter(key => key!=='role' && key!=='summonerId');
                let roleStatsClone = Object.assign({}, player);
                delete roleStatsClone.role;
                delete roleStatsClone.summonerId;
                let playerAverageStats = Object.values(roleStatsClone).map(val=> val * 1 );
                // console.log('CATEGORIES', categories);

                let averageRegionStats;
                switch(player.role) {
                    case 'SUPPORT':
                    averageRegionStats = regionSupportStats;
                    break;
                    case 'CARRY':
                    averageRegionStats = regionCarryStats;
                    break;
                    case 'JUNGLE':
                    averageRegionStats = regionJungleStats;
                    break;
                    case 'MID':
                    averageRegionStats = regionMidStats;
                    break;
                    case 'TOP':
                    averageRegionStats = regionTopStats;
                    break;
                    default:
                    break;
                }

                // console.log('AVERAGE REGION STATS', averageRegionStats);



                var config = {
                    chart: {
                            polar: true,
                            type: 'line',
                            width: 400,
                            backgroundColor: '#fff',
                            renderTo: `stat_container${i}`
                        },
                        title: {
                            text: `${player.role}`,
                            // x: -80
                        },
                        pane: {
                            size: '80%'
                        },
                        xAxis: {
                            categories: categories,
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

                        },
                        series: [{
                            name: 'Player',
                            data: playerAverageStats,
                            pointPlacement: 'on'
                        }, {
                            name: 'Region',
                            data: averageRegionStats,
                            pointPlacement: 'on'
                        }]
                };

                return (<div key={i} className="highCharts">
                    <ReactHighcharts domProps = {{id: `stat_container${i}`}} config = {config}></ReactHighcharts>
                </div>)
            })}

            {this.props.averagePlayerMainStats.map((player, i) => {
                const mainCategories = Object.keys(player).filter(key => key!=='role' && key!=='summonerId');
                let roleMainStatsClone = Object.assign({}, player);
                delete roleMainStatsClone.role;
                delete roleMainStatsClone.summonerId;
                let playerAverageMainStats = Object.values(roleMainStatsClone).map(val=> parseInt(val) );

                let averageRegionMainStats;
                switch(player.role) {
                    case 'SUPPORT':
                    averageRegionMainStats = regionSupportMainStats
                    break;
                    case 'CARRY':
                    averageRegionMainStats = regionCarryMainStats;
                    break;
                    case 'JUNGLE':
                    averageRegionMainStats = regionJungleMainStats;
                    break;
                    case 'MID':
                    averageRegionMainStats = regionMidMainStats;
                    break;
                    case 'TOP':
                    averageRegionMainStats = regionTopMainStats;
                    break;
                    default:
                    break;
                }

                var barConfig = {
chart: {
        renderTo: `container_${i}`,
        type: 'bar'
        },
        title: {
            text: `${player.role}`
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: mainCategories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'player',
            data: playerAverageMainStats
        }, {
            name: 'region',
            data: averageRegionMainStats
        }]
}

               return(
                <div key={i} className="highCharts">
                    <ReactHighcharts domProps = {{id: `container_${i}`}} config = {barConfig}></ReactHighcharts>
               </div>)
            })}



            </div>

        </div>)
    }
}


const mapStateToProps = (state, ownProps) => {
    const { averageRegionStats, averagePlayerStats, averageRegionMainStats, averagePlayerMainStats } = state.singleSummoner;
    return {
        averageRegionStats,
        averagePlayerStats,
        averageRegionMainStats,
        averagePlayerMainStats,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        findRegionAverageByRole: () => { dispatch(findRegionAverageByRole())},
        findPlayerAverageByRole: (summonerId) => { dispatch(findPlayerAverageByRole(summonerId))},
        findRegionAverageByRoleMainStats: () => {dispatch(findRegionAverageByRoleMainStats())},
        findPlayerAverageByRoleMainStats: (summonerId) => {dispatch(findPlayerAverageByRoleMainStats(summonerId))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactHighChart);


//  return (
//            <div className="playerContainer clearfix">
//             &nbsp;
//             <div>
//                 <div className="highCharts">
//                     <ReactHighcharts config = {config}></ReactHighcharts>
//                 </div>
//                 <div className="highCharts">
//                     <ReactHighcharts config = {config}></ReactHighcharts>
//                 </div>
//                 <div className="highCharts">
//                     <ReactHighcharts config = {config}></ReactHighcharts>
//                 </div>
//             </div>
//             <div className="bottomCharts">
//                  <div className="highCharts">
//                     <ReactHighcharts config = {config}></ReactHighcharts>
//                 </div>
//                 <div className="highCharts">
//                     <ReactHighcharts config = {config}></ReactHighcharts>
//                 </div>
//             </div>
//         </div>)

