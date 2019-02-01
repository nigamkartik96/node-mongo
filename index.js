'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();
mongoose.connect('mongodb://localhost:27017/aws');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let userSchema = new mongoose.Schema({
    name    : {
        type: String    
    },
    phone   : {
        type: Number
    }
});

let User = mongoose.model('User', userSchema);

app.get('/getAll', (req, res) => {
    let name = req.query.name;
    console.log(req.query.name);
    User.find({name: name})
        .then((value) => {
            res.send(value);
        });
});

app.post('/enterData', (req, res) => {
    console.log(req.body);
    let user = new User({
        name    : req.body.name,
        phone   : req.body.phone
    });

    user.save()
        .then(doc => {
            console.log(doc._id);
            res.sendStatus(200);
            res.send("Saved data of: " + req.body.name);
        })
        .catch(err => {
            res.sendStatus(501);
            res.send(err);
        });
});

app.listen(4000);