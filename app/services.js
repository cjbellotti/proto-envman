var app = require('express')();

app.use(require('./data'));
app.use(require('./verify'));

module.exports = app;
