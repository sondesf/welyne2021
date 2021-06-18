//mongodb connection : mongodb+srv://user1:<password>@cluster0.juhvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// password mongodb: 3ekdqQ0qvMPOBbW7
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user1:3ekdqQ0qvMPOBbW7@cluster0.juhvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });



app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // next();
});

app.use(bodyParser.json());
//post middleware should be above the get middleware 
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;