const elasticSearch = require('elasticsearch');
const { GameStats, Summoner, Champion } = require('../models/db');


/*
    esClient object to communicate with Elasticsearch
    log all errors
*/
const esClient = new elasticSearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

/* bulk index ingestion */
const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(gameStats => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: gameStats.id
        }
      });
      bulkBody.push(gameStats);
    });

    return esClient.bulk({body: bulkBody})
        .then(response => {
            let errorCount = 0;
                response.items.forEach(item => {
                    if (item.index && item.index.error) {
                    console.log(++errorCount, item.index.error);
                    }
                });
            console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        });
};

/* indexing one */
const indexOne = function indexOne(index, type, data){
    return esClient.index({
        index: index,
        id: data.id,
        type: type,
        body: data
    });
};


/* delete an index */
const deleteAllIndex = function deleteAllIndex(index){
    return esClient.indices.delete({index: index});
};

/* define mappings for index 'riot */
const defineMapping = function defineMapping (){
       esClient.indices.putMapping({
                index: 'riot',
                type: 'summoners',
                body: {
                    properties: {
                        'gameStats.totalDamageDealtToBuildingsPerMin': {
                            'type': 'float', // type is a required attribute if index is specified
                        },
                        'gameStats.visionWardsBoughtPerFiveMin': {
                            'type': 'float'
                        },
                        'gameStats.totalDamageTakenPerMin': {
                            'type': 'float'
                        },
                        'gameStats.totalDamageDealtPerMin': {
                            'type': 'float'
                        },
                        'gameStats.totalDamageDealtToChampionsPerMin': {
                            'type': 'float'
                        },
                        'gameStats.wardPlacedPerFiveMin': {
                            'type': 'float'
                        },
                        'gameStats.wardKilledPerFiveMin': {
                            'type': 'float'
                        }
                    }
                }
            })
            .then(mappingCreated=> {
               console.log('mappings created');
               getMapping('riot');
            });
};

/* get mapping of index */
const getMapping= function getMapping(index){
    return esClient.indices.getMapping({
        index: index
    })
    .then((resultMappings)=> {
       console.log(JSON.stringify(resultMappings, null, 4));
    });
};

/* ------------------ SEARCH ---------------- */

/* Search all */
const searchAll = function searchAll(index, body) {
    return esClient.search({
        index: index,
        body: {
            size: 10,
            from: 0,
            query: {
                match_all: {}
            }
        }
    });
//    .then(results => {
//         console.log(`found ${results.hits.total} items in ${results.took}ms`);
//         console.log(`returned article titles:`);
//         console.log(`actual results: ${JSON.stringify(results, null, 4)}`);
//         results.hits.hits.forEach(
//         (hit, index) => console.log(
//             `\t${++index} - ${JSON.stringify(hit._source)}`
//         ));
//     });
};



const searchGameStats = function searchQuery(index, type, field, word){
    esClient.search({
            index: index,
            body: {
                    query: {
                        match: {
                            'summoner.name': {
                                query: 'daduu',
                            }
                        }
                    }
                }
    }).then(results => {
        console.log("--- Results from search ---");
        console.log(JSON.stringify(results, null, 4));
    });
};


//check status
const checkStatus = function checkStatus() {
  return esClient.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
};




module.exports = {
    bulkIndex,
    indexOne,
    deleteAllIndex,
    searchAll,
    searchGameStats,
    checkStatus
};






deleteAllIndex('riot')
.then((deleted) => {
    console.log('deleted:', deleted);
    return esClient.indices.exists({index:'riot'});
})
.then(exists=> {
    console.log('exists', exists);
   if(!exists){
        return esClient.indices.create({'index': 'riot'});
   }
})
.then((created)=> {
    console.log('CREATED INDEX:', created);
    if(created){
        defineMapping();
    }
})
.then(()=> {
    return Summoner.findAll({
        include: [ { model: GameStats,
                include: [{model: Champion  } ]
            }]
   });
})
.then(gameStats=> {
    return bulkIndex('riot', 'summoners', gameStats);
})
.then(()=> {
    checkStatus();
})
.catch(err => {
    console.error('error occured when creating index', err);
});





