
const xRay = require('x-ray')();
const express = require('express');
const router = express.Router();


// router.use((req, res, next) => {
//     console.log('SCRAPPING STUFF');
//              xRay('https://flightclub.com/nike', {
//             kicks: xRay('li.item', [{
//                 title: '.product-name',
//                 image: 'img@src',
//                 price: '.price',
//             }]),
//         })
//         .paginate('.i-next@href') //not working
//         .limit(10)
//         .write('results.json')
//         next();
// });


module.exports = router;

