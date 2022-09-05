const express = require('express');
const logger = require('morgan');
const mongoClient = require('mongoose');
const bodyParser = require('body-parser');

// setup connect mongodb by moongoose
mongoClient.connect('mongodb://localhost/nodejsapistarter')
    .then(()=> console.log('Connection Successfully !'))
    .catch((error) => console.error(`Connection Failed With Error: ${error}`));

const app = express();

const userRoute = require('./routes/user');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users',userRoute);

// Routes
app.get('/',(req, res, next) => {
    return res.status(200).json({
        message: "Server is OK!"
    });
});

// Catch 404 Errors and forward them to error handler
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500

    // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    });
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port,() => console.log(`Server is listening on port ${port}`));