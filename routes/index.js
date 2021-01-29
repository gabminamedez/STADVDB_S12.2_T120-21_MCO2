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

    let query = `SELECT YEAR(last_review) AS last_review_year, room_type, SUM(price) total_price
                FROM listings
                INNER JOIN room_types USING (room_type_id)
                INNER JOIN locations USING (location_id)
                INNER JOIN neighbourhoods USING (neighbourhood_id)
                INNER JOIN neighbourhood_groups USING (neighbourhood_group_id)
                WHERE neighbourhood_group = '${neighbourhood_group}'
                GROUP BY YEAR(last_review), room_type
                WITH ROLLUP;`;

    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query1', { title: 'Roll-Up', results: result, neighbourhood_group: neighbourhood_group });
    });
});

router.get('/query2', function(req, res, next) {
    let query = `SELECT YEAR(last_review) last_review_year, neighbourhood_group, room_type, AVG(price) avg_price
                FROM listings
                INNER JOIN room_types USING (room_type_id)
                INNER JOIN locations USING (location_id)
                INNER JOIN neighbourhoods USING (neighbourhood_id)
                INNER JOIN neighbourhood_groups USING (neighbourhood_group_id)
                GROUP BY YEAR(last_review), neighbourhood_group, room_type
                ORDER BY YEAR(last_review), neighbourhood_group, room_type;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query2', { title: 'Drill-Down', results: result });
    });
});

router.get('/query3', function(req, res, next) {
    res.render('query3', { title: 'Slice' });
});

router.post('/query3', function(req, res, next) {
    var year = req.body.year;

    let query = `SELECT neighbourhood, AVG(reviews_per_month) avg_reviews
                FROM listings
                INNER JOIN room_types USING (room_type_id)
                INNER JOIN locations USING (location_id)
                INNER JOIN neighbourhoods USING (neighbourhood_id)
                WHERE YEAR(last_review) = ${ year }
                GROUP BY neighbourhood
                ORDER BY avg_reviews;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query3', { title: 'Slice', results: result, year: year });
    });
});

router.get('/query4', function(req, res, next) {
    let query = `SELECT DISTINCT neighbourhood
                 FROM neighbourhoods;`;

    db.query(query, (err, result) => {
        if(err) throw err;

        res.render('query4', { title: 'Dice', choices: result });
    });
});

router.post('/query4', function(req, res, next) {
    let neighbourhood1 = req.body.neighbourhood1;
    let neighbourhood2 = req.body.neighbourhood2;
    let year = req.body.year;

    let query = `SELECT neighbourhood, YEAR(last_review) AS last_review_year, AVG(price) avg_price
                FROM listings
                INNER JOIN room_types USING (room_type_id)
                INNER JOIN locations USING (location_id)
                INNER JOIN neighbourhoods USING (neighbourhood_id)
                WHERE neighbourhood in ('${ neighbourhood1 }', '${ neighbourhood2 }') AND YEAR(last_review) = ${ year }
                GROUP BY neighbourhood, last_review_year;`;

    let query1 = `SELECT DISTINCT neighbourhood
                FROM neighbourhoods;`;
    
    db.query(query, (err, result) => {
        if(err) throw err;

        db.query(query1, (err, result1) => {
            if(err) throw err;
    
            res.render('query4', { title: 'Dice', choices: result1, results: result, neighbourhood1: neighbourhood1, neighbourhood2: neighbourhood2, year: year });
        });
    });
});

module.exports = router;