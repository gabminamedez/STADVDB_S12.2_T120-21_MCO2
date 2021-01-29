const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const db = mysql.createConnection({
    host: "cis9cbtgerlk68wl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "eff3dkg8r5y5l42x",
    password: "hldf6ajnwjyzo90f",
    database: "dpuui2kh95t8cclk"
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connected to database!');
});

global.db = db;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));

app.listen(port, () => { console.log('App listening at port http://localhost:' + port + '.') });