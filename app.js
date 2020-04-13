const express = require('express');
const Response = require('./config/Response');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const customerRoutes = require('./api/routes/customer');
const supplierRoutes = require('./api/routes/supplier');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/MedicDB',{useNewUrlParser: true} ,(err) => {
    if (err) {
        console.log('\x1b[31m','Medigo Db connection failed try to reconnect...');
        createDbConnection();
    } else {
        console.log('\x1b[33m','Medic Db Connection up');
    }
});
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/api/customer', customerRoutes);
app.use('/api/supplier', supplierRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

app.use((req, res, next) => {
    Response.create(res, 200, 'working', null);
});

module.exports = app;
