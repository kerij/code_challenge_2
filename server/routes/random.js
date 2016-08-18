var express = require('express');
var router = express.Router();


var random = function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    }


module.exports = random;
