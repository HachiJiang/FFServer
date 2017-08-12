'use strict';

const express = require('express');
const mongoose = require('mongoose').set('debug', false);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const accountValidation = require('./tests/accountValidation');
const debtorValidation = require('./tests/debtorValidation');

const app = express();

mongoose.connect('mongodb://localhost:27017/finance');

const VALIDATION_ENABLED = true;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connection successfully!');
    if (VALIDATION_ENABLED) {
        accountValidation.checkBalance();
        debtorValidation.checkBalance();
    }
});

/**
 * Use Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());   // For parse json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('static', express.static('public'));


// allow cross domain request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
        return res.status(200).json({});
    }

    next();
});

/**
 * Use routes
 */
require('./routes/index')(app);

/**
 * Use Error handlers
 */
app.use((req, res, next) => {
    const err= new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

/**
 * Server
 */
const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log(`Express server is listening to port ${port}`);
});