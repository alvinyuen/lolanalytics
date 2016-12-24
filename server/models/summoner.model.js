'use strict';

const Sequelize = require('sequelize');

const db = require('./_db');

const Summoner = db.define('summoner', {
    uuid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: Sequelize.BIGINT,

    },
    name: {
        type: Sequelize.STRING,

    },
    profileIconId: {
        type: Sequelize.INTEGER,

    },
    summonerLevel: {
        type: Sequelize.INTEGER,

    },
    region: {
        type: Sequelize.STRING,

    },
    revisionDate: {
        type: Sequelize.DATE,

    },
    views : {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    likes : {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    classMethods: {
        findAllSummonerNames: function () {
            return Summoner.findAll({
                attributes: ['name']
            });
        },
        findByNameAndRegion: function (data) {
            return Summoner.findOne({
                where: {
                    name: data.name,
                    region: data.region
                }
            });
        },
        updateOrCreateSummoner: function (data) {
            return Summoner.findByNameAndRegion(data)
                .then(summoner => {
                    if (!summoner) {
                        return Summoner.create(data);
                    } else {
                        return summoner.updateAttributes(data);
                    }
                });
        }
    }
});


module.exports = Summoner;