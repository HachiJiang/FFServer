const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

/**
 * Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('static', express.static('public'));
app.set('view engine', 'pug');

/**
 * Routes
 */
const recordRoutes = require('./routes/records');
const recordTypeRoutes = require('./routes/recordTypes');
const accountCatRoutes = require('./routes/accounts');
const projectCatRoutes = require('./routes/projects');
const memberRoutes = require('./routes/members');
const debtorRoutes = require('./routes/debtors');

app.use('/records', recordRoutes);
app.use('/recordtypes', recordTypeRoutes);
app.use('/accountcat', accountCatRoutes);
app.use('/projectcat', projectCatRoutes);
app.use('/members', memberRoutes);
app.use('/debtors', debtorRoutes);

/**
 * Error handlers
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