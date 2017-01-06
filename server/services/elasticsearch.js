const elasticSearch = require('elasticsearch');
const GameStats = require('../models/gameStats.model');
const Summoner = require('../models/summoner.model');
const Champion = require('../models/summoner.model');

//log all errors
//esClient object to communicate with Elasticsearch
const esClient = new elasticSearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

/* index related */
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

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err);
};


const indexOne = function indexOne(index, type, data){
    esClient.index({
    index: index,
    id: data.id,
    type: type,
    body: data
    },function(err,resp,status) {
        console.log(resp);
    });
};



//delete all
const deleteAllIndex = function deleteAllIndex(index){
  esClient.indices.delete({index: index}, function(err, resp, status){
     console.log("delete:", resp, "status:", status);
  });
};




/* Search related */
const searchAll = function searchAll(index, body) {
  return esClient.search({
      index: index,
      body: {
      size: 20,
      from: 0,
      query: {
         match_all: {}
      }
   }})
   .then(results => {
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        console.log(`returned article titles:`);
        results.hits.hits.forEach(
        (hit, index) => console.log(
            `\t${++index} - ${hit._source.title}`
        ));
    })
    .catch(console.error);
};




const searchGameStats = function searchQuery(index, type, field, word){
    esClient.search({
            index: index,
            type: type,
            body: {
                    query: {
                        match: {
                            field : {
                                query: word
                                }
                        },
                    }
                }
    },function (error, response,status) {
        if (error){
            console.log("search error: "+error);
        }
        else {
            console.log("--- Response ---");
            console.log(response);
            console.log("--- Hits ---");
            response.hits.hits.forEach(function(hit){
                console.log(hit);
            });
        }
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


GameStats.findAll({
       include:[ {model: Champion}]
   }).then(gameStats => {
       checkStatus();
   });
