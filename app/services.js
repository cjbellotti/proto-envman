var app = require('express')();

app.use(require('./data'));
app.use(require('./verify'));
app.use(require('./get-tablas'));
app.use(require('./get-ambientes'));
app.use(require('./get-config'));

module.exports = app;
