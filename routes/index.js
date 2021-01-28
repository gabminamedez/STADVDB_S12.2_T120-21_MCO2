const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});

router.get('/query1', function(req, res, next) {
    res.render('query1', { title: 'Roll-Up' });
});

router.post('/query1', function(req, res, next) {
    var neighbourhood_group = req.body.neighbourhood_group;

    let query = `SELECT room_type, host_id, SUM(price) totalPrice
                FROM listings
                INNER JOIN room_types USING (room_type_id)
                INNER JOIN locations USING (location_id)
                INNER JOIN neighbourhoods USING (neighbourhood_id)
                INNER JOIN neighbourhood_groups USING (neighbourhood_group_id)
                WHERE neighbourhood_group= '${neighbourhood_group}'
                GROUP BY room_type_id, host_id
                WITH ROLLUP;`;

    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query1', { title: 'Roll-Up', results: result, neighbourhood_group: neighbourhood_group });
    });
});

router.get('/query2', function(req, res, next) {
    res.render('query2', { title: 'Query 2' });
});

router.post('/query2', function(req, res, next) {
    var month = req.body.month;
    var minimum_nights = req.body.minimum_nights;

    let query = `SELECT name, room_type, price 
                 FROM listings 
                 WHERE MONTH(last_review) = ${month} AND minimum_nights >= ${minimum_nights} 
                 ORDER BY name;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query2', { title: 'Query 2', results: result, month: month, minimum_nights: minimum_nights });
    });
});

router.get('/query3', function(req, res, next) {
    res.render('query3', { title: 'Query 3' });
});

router.post('/query3', function(req, res, next) {
    var number_of_reviews = req.body.number_of_reviews;
    let query = `SELECT l.name, h.host_name, l.number_of_reviews 
                 FROM hosts as h 
                 JOIN listings as l ON h.host_id=l.host_id 
                 WHERE l.number_of_reviews >= ${number_of_reviews} 
                 ORDER BY l.name;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query3', { title: 'Query 3', results: result, number_of_reviews: number_of_reviews });
    });
});

router.get('/query4', function(req, res, next) {
    res.render('query4', { title: 'Query 4' });
});

router.post('/query4', function(req, res, next) {
    let lower_price = req.body.lower_price;
    let higher_price = req.body.higher_price;

    let query = `SELECT l.name, h.host_name, l.price 
                 FROM hosts as h 
                 JOIN listings as l ON h.host_id=l.host_id 
                 WHERE l.price BETWEEN ${lower_price} AND ${higher_price}
                 ORDER BY l.name;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query4', { title: 'Query 4', results: result, lower_price: lower_price, higher_price: higher_price });
    });
});

module.exports = router;